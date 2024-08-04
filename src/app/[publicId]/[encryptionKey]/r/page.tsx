"use client";

import { Button, Center, Container, CopyButton, Divider, Group, Stack, Text, Textarea, Title } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

import { useState } from "react";
import { toast } from "react-toastify";

export default function RetrieveSecret({ params }: { params: { publicId: string; encryptionKey: string } }) {
	const [secret, setSecret] = useState<string | null>(null);

	const onClick = async () => {
		let response;

		try {
			response = await fetch(`/api/secret?publicId=${params.publicId}&encryptionKey=${params.encryptionKey}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			if (error.status == 404) {
				toast.error("Invalid URL");
			} else if (error.status == 400) {
				toast.error("hello");
			} else {
				toast.error("An error occurred while retrieving the secret");
			}

			console.log(error);
			setSecret(null);
			return;
		}

		if (response.status == 404) {
			return toast.error("Invalid URL, make sure the URL is valid or ask for a new one.");
		} else if (response.status == 400) {
			return toast.error("You've already seen that secret, it can only be viewed once!");
		}

		if (response.status != 200) {
			return toast.error("An error occurred while retrieving the secret");
		}

		const result = await response.json();
		setSecret(result["message"]);
	};

	return (
		<Container p="xl">
			<Title className="text-4xl font-bold">Retrieve your shared secret</Title>
			<br />

			<Stack justify="center" align="center">
				{!secret ? (
					<>
						Click this button to retrieve the secret
						<Button onClick={onClick} maw="250px">
							Get the secret
						</Button>
					</>
				) : (
					<>
						Here&apos;s your secret
						<Divider w="100%" />
						<Stack w="100%">
							<br />
							<Center>
								<Text c="gray" style={{ fontWeight: "bold", border: "2px solid black" }} w="50%" p="lg">
									{secret}
								</Text>
							</Center>

							<Center>
								<CopyButton value={secret}>
									{(payload) => {
										if (payload.copied) {
											return (
												<Button c="green" style={{ fontWeight: "bold" }} w="250px">
													<IconCheck />
													Copied
												</Button>
											);
										}

										return (
											<Button onClick={payload.copy} w="250px">
												<IconCopy />
												<Text ms="xs">Copy</Text>
											</Button>
										);
									}}
								</CopyButton>
							</Center>
						</Stack>
					</>
				)}
			</Stack>
		</Container>
	);
}

export const runtime = "edge";
