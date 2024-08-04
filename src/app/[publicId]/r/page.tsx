"use client";

import { Button, Center, Container, CopyButton, Divider, Group, Stack, Text, Textarea, Title } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

import { useState } from "react";
import { toast } from "react-toastify";

export default function RetrieveSecret({ params }: { params: { publicId: string } }) {
	// Retrieve secret public info
	const [secret, setSecret] = useState<string | null>(null);

	const onClick = () => {
		fetch(`/api/secret?publicId=${params.publicId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => setSecret(data.message))
			.catch(() => toast.error("Failed to fetch the secret"));
	};

	return (
		<Container p="xl">
			<Title className="text-4xl font-bold">Retrieve your shared secret</Title>
			<br />

			<Stack justify="center" align="center">
				{!secret && (
					<>
						Click this button to retrieve the secret
						<Button onClick={onClick} maw="250px">
							Get the secret
						</Button>
					</>
				)}
				{secret && (
					<>
						Here's your secret
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
