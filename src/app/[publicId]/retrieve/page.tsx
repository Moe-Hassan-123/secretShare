"use client";
import React, { useState } from "react";
import { Container, Title, Text, Button, Paper, Stack, Alert, Card, Modal, Textarea } from "@mantine/core";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import CopyButton from "@/components/buttons/CopyButton";
import { boolean } from "zod";

export default function RetrieveSecret({ params }: { params: { publicId: string } }) {
	const searchParams = useSearchParams();
	const encryptionKey = searchParams.get("key");
	const [loading, setLoading] = useState(false);
	const [secret, setSecret] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [viewed, setViewed] = useState<boolean>(false);

	const handleViewSecret = async () => {
		let response;
		setLoading(true);

		try {
			response = await fetch(`/api/secret?publicId=${params.publicId}&encryptionKey=${encryptionKey}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			setSecret(null);
			return;
		} finally {
			setLoading(false);
		}

		if (response.status == 404) {
			setError("Invalid URL, make sure the URL is valid or ask for a new one.");
			return toast.error("Invalid URL, make sure the URL is valid or ask for a new one.");
		} else if (response.status == 400) {
			setError("You've already seen that secret, it can only be viewed once!");
			return toast.error("You've already seen that secret, it can only be viewed once!");
		}

		if (response.status != 200) {
			return toast.error("An error occurred while retrieving the secret");
		}

		const result = await response.json();
		setSecret(result["message"]);
		setViewed(true);
	};

	return (
		<Container size="sm" mt="xl">
			<Paper shadow="md" p="xl" radius="md">
				<Stack gap="xl">
					<Title order={1} ta="center">
						Retrieve Your Secure Message
					</Title>

					{!viewed ? (
						<>
							<Text ta="center">
								The message you're about to view has been shared securely and can only be accessed once. After viewing, it will be permanently deleted from our servers.
							</Text>

							{!error ? (
								<Button onClick={handleViewSecret} size="lg" fullWidth disabled={loading}>
									View Secret
								</Button>
							) : (
								<Alert title="Error happened" color="red">
									{error}
								</Alert>
							)}
						</>
					) : (
						<>
							<Alert title="Message Retrieved" color="green">
								Message successfully retrieved and deleted. For security, this link cannot be used again.
							</Alert>
						</>
					)}
				</Stack>
			</Paper>

			<Modal opened={!!secret} onClose={() => setSecret(null)} size="lg" title={<Title order={3}>Your Secret is Ready</Title>} centered>
				<Stack gap="md">
					<Textarea rows={5} readOnly>
						{secret}
					</Textarea>

					<CopyButton value={secret!} />

					<Text c="dimmed" size="sm">
						Message successfully retrieved and deleted. For security, this link cannot be used again.
					</Text>
				</Stack>
			</Modal>
		</Container>
	);
}
