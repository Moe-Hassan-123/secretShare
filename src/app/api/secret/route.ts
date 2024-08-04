import { CreateSecret } from "@/types/CreateSecretRequest";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const secretId = request.nextUrl.searchParams.get("sid");
	if (!secretId) {
		return NextResponse.json({ error: "Missing secret id" }, { status: 400 });
	}

	// TODO: Read secret from DynamoDB
	return NextResponse.json({ message: `Reading: ${secretId}` }, { status: 200 });
}

export async function POST(request: NextRequest) {
	const data = await request.json();
	const result = await CreateSecret.safeParseAsync(data);
	if (!result.success) {
		return NextResponse.json({ error: "Invalid request body", details: result.error.issues }, { status: 400 });
	}

	// TODO: Store secret in DynamoDB
	return NextResponse.json({ message: "Secret created successfully" }, { status: 201 });
}
