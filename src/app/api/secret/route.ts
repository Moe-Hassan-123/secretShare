import { CreateSecret } from "@/types/CreateSecretRequest";
import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
	region: process.env.AWS_REGION,
});

export async function GET(request: NextRequest) {
	const secretId = request.nextUrl.searchParams.get("publicId");

	if (!secretId) {
		return NextResponse.json({ error: "Missing public id" }, { status: 400 });
	}

	const item = await client.send(
		new GetItemCommand({
			TableName: "shareSecretsDb",
			Key: {
				publicId: { S: secretId },
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

	await client.send(
		new UpdateItemCommand({
			TableName: "shareSecretsDb",
			Key: {
				publicId: { S: secretId },
			},
			AttributeUpdates: {
				viewed: {
					Action: "PUT",
					Value: {
						BOOL: true,
					},
				},
			},
		})
	);

	const secret = item.Item["secret"]["S"];
	return NextResponse.json({ message: secret }, { status: 200 });
}

export async function POST(request: NextRequest) {
	const data = await request.json();
	const result = await CreateSecret.safeParseAsync(data);
	if (!result.success) {
		return NextResponse.json({ error: "Invalid request body", details: result.error.issues }, { status: 400 });
	}

	const item = result.data;
	const publicId = randomUUID().toString();

	await client.send(
		new PutItemCommand({
			TableName: "shareSecretsDb",
			Item: {
				publicId: { S: publicId },
				secret: { S: item.secret },
				sentBy: { S: item.sendMethod ?? "" },
				extraInfoToReceiver: { S: item.extraInfoToReceiver ?? "" },
				receiverEmail: { S: item.receiverEmail ?? "" },
				viewed: { BOOL: false },
			},
		})
	);

	return NextResponse.json({ publicId: publicId }, { status: 201 });
}
