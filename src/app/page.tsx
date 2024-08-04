"use client";

import { CreateSecretRequest } from "@/types/CreateSecretRequest";
import { Button, Center, Container, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
	const [shareUrl, setShareUrl] = useState<string | null>(null);

	const initialValues: CreateSecretRequest = {
		secret: "",
	};

	const form = useForm({
		mode: "uncontrolled",
		initialValues: initialValues,
		validate: {
			secret: (value) => (value.length > 0 ? null : "Secret is required"),
		},
	});

	return (
		<Container>
			<h1 className="text-4xl font-bold">Share secrets with Ease!</h1>

			<Center w="100%">
				{!shareUrl && (
					<form
						onSubmit={form.onSubmit((values) => {
							fetch("/api/secret/", {
								method: "POST",
								body: JSON.stringify(values),
							}).then(async (res) => {
								const data = await res.json();
								console.log(data);
								const publicId = data["publicId"] as string;
								const url = `${window.location.origin}/${publicId}/r`;
								setShareUrl(url);
							});
						})}
					>
						<Textarea label="Secret" name="secret" key={form.key("secret")} {...form.getInputProps("secret")} />

						<Center mt="xl">
							<Button maw="300px" type="submit">
								Share
							</Button>
						</Center>
					</form>
				)}
				{shareUrl && (
					<Stack>
						<Text c="gray">{shareUrl}</Text>

						<Center>
							<Button maw="300px" onClick={() => navigator.clipboard.writeText(shareUrl)}>
								Copy Link
							</Button>
						</Center>
					</Stack>
				)}
			</Center>
		</Container>
	);
}
