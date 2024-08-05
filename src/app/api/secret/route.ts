import { CreateSecret, CreateSecretRequest } from "@/types/CreateSecretRequest";
import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { aesGcmDecrypt, aesGcmEncrypt } from "@/utils/encryption";
import generateRandomNumber from "@/utils/generateRandomNumber";
import generateRandomString from "@/utils/generateRandomString";

const client = new DynamoDBClient({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
	region: process.env.AWS_REGION,
});

export async function GET(request: NextRequest) {
	const publicId = request.nextUrl.searchParams.get("publicId");
	const encryptionKey = request.nextUrl.searchParams.get("encryptionKey");

	if (!publicId) {
		return NextResponse.json({ error: "Missing public id" }, { status: 400 });
	}

	const item = await client.send(
		new GetItemCommand({
			TableName: "shareSecretsDb",
			Key: {
				publicId: { S: publicId },
			},
			ProjectionExpression: "secret, viewed",
		})
	);

	if (!item.Item) {
		return NextResponse.json({ error: "Secret not found" }, { status: 404 });
	}

	if (item.Item["viewed"]["BOOL"]) {
		return NextResponse.json({ error: "Secret already viewed" }, { status: 400 });
	}

	// We keep a reference in the DB in order to show appropriate error messages in the future if the link was used again.
	// We destroy the secret and set a "viewed" column as true.
	// but in any case, the stored secret is encrypted and can only be decrypted by the key embedded in the URL given to the user.
	await client.send(
		new UpdateItemCommand({
			TableName: "shareSecretsDb",
			Key: {
				publicId: { S: publicId },
			},
			AttributeUpdates: {
				viewed: {
					Action: "PUT",
					Value: {
						BOOL: true,
					},
				},
				secret: {
					Action: "PUT",
					Value: {
						S: "",
					},
				},
			},
		})
	);

	const secret = item.Item["secret"]["S"]!;
	const data = await aesGcmDecrypt(secret, encryptionKey!);
	return NextResponse.json({ message: data }, { status: 200 });
}

export async function POST(request: NextRequest) {
	const data = await request.json();
	const result = await CreateSecret.safeParseAsync(data);
	if (!result.success) {
		return NextResponse.json({ error: "Invalid request body", details: result.error.issues }, { status: 400 });
	}

	const item = result.data;
	const publicId = generateRandomNumber(4);
	const encryptionKey = generateRandomString(8);

	const encryptedSecret = await aesGcmEncrypt(item.secret, encryptionKey);

	try {
		await putItem(publicId, encryptedSecret, item);
	} catch (error) {
		// In the slight case of having a public ID be repeated twice in the DB,
		// we generate another public ID and try again.
		await putItem(generateRandomNumber(4), encryptedSecret, item);
	}

	// encryptionKey is never stored in the DB, it's returned to the user
	// in order to be appended to the url.
	return NextResponse.json({ publicId, encryptionKey }, { status: 201 });
}

const putItem = async (publicId: string, encryptedSecret: string, item: CreateSecretRequest) => {
	const expirationTime = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

	await client.send(
		new PutItemCommand({
			TableName: "shareSecretsDb",
			Item: {
				publicId: { S: publicId },
				secret: { S: encryptedSecret },
				sentBy: { S: item.sendMethod ?? "" },
				extraInfoToReceiver: { S: item.extraInfoToReceiver ?? "" },
				receiverEmail: { S: item.receiverEmail ?? "" },
				viewed: { BOOL: false },
				expirationTime: { N: expirationTime.toString() }, // Add expiration time
			},
		})
	);
};

export const runtime = "edge";
