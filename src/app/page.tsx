"use client";

import CopyButton from "@/components/buttons/CopyButton";
import { CreateSecretRequest } from "@/types/CreateSecretRequest";
import { Anchor, Button, Center, Container, Group, Mark, Modal, Paper, Stack, Text, Textarea, Title, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandGithub, IconLock, IconLockAccessOff, IconLockDown, IconLockExclamation, IconLockMinus, IconLockPlus, IconLockSquareRounded } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogoSvg from "@/static/Logo.svg";

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

	const theme = useMantineTheme();

	return (
		<Container size="sm" my="xl">
			<Stack gap="xl">
				<Center>
					<Image src={LogoSvg} alt="SecretShare" width={48} height={48} />
				</Center>

				<Title order={1} ta="center">
					Share Secrets Securely, One Time Only
				</Title>

				<Text size="lg" ta="center">
					Protect your sensitive information with our simple, encrypted, single-use sharing system.
				</Text>

				<Paper withBorder p="md" shadow="xl">
					<form
						onSubmit={form.onSubmit((values) => {
							fetch("/api/secret/", {
								method: "POST",
								body: JSON.stringify(values),
							}).then(async (res) => {
								const data = await res.json();

								const publicId = data["publicId"] as string;
								const encryptionKey = data["encryptionKey"] as string;
								const url = `${window.location.origin}/${publicId}/retrieve/?key=${encryptionKey}`;
								setShareUrl(url);
								form.reset();
							});
						})}
					>
						<Stack gap="md">
							<Title order={3} component={Center}>
								<IconLock color={theme.colors.golden[6]} />
								Secret Input Form
							</Title>
							<Textarea placeholder="Enter your secret message here..." minRows={4} key={form.key("secret")} {...form.getInputProps("secret")} />

							<Button bg={theme.colors.golden[5]} type="submit">
								<IconLockPlus />
								Generate Secure Link
							</Button>

							<Text size="sm" c="dimmed">
								The generated link will be valid for 24 hours.
							</Text>
						</Stack>
					</form>
				</Paper>

				<Paper withBorder p="md" shadow="sm">
					<Stack gap="md">
						<Title order={3}>How It Works</Title>

						<ol>
							<li>
								Enter your secret message (
								<Anchor component={Link} href="/encryption" target="_blank">
									encrypted instantly
								</Anchor>
								, before it leaves your device)
							</li>
							<li>Get a unique, one-time-use URL</li>
							<li>Share the URL with your intended recipient</li>
							<li>Once viewed, the secret is permanently deleted</li>
						</ol>
					</Stack>
				</Paper>

				<Paper withBorder p="md" shadow="sm">
					<Stack gap="md">
						<Title order={3}>We Prioritize Your Privacy</Title>

						<ol>
							<li>
								End-to-end encryption: Your message is <Mark>encrypted on your device</Mark> before it's sent to our servers
							</li>
							<li>
								<Anchor component={Link} href="/encryption" target="_blank">
									Zero-knowledge architecture
								</Anchor>
								: We never have access to your unencrypted data
							</li>
							<li>
								No logs, no traces: Once viewed, your secret is <Mark>permanently erased</Mark> from our systems
							</li>
							<li> No account required: Share secrets without creating an account or giving us any personal information</li>
							<li>We don't data mine: Your information isn't used to build profiles or serve ads</li>
						</ol>
					</Stack>
				</Paper>

				<Paper withBorder p="md" shadow="sm">
					<Stack gap="md">
						<Title order={3}>Why Choose Us?</Title>

						<ol>
							<li>Focused service: We do one thing - secure, temporary secret sharing - and we do it well</li>
							<li>
								Truly temporary: Unlike "disappearing" messages on some platforms, <Mark>your secrets are permanently deleted</Mark> after viewing
							</li>
							<li>Open source: Our code is transparent and open for inspection, fostering trust and enabling community contributions</li>
							<li>Independent from Big Tech: We're not part of large tech ecosystems that often prioritize data collection over privacy</li>
						</ol>
					</Stack>
				</Paper>

				<Paper withBorder p="md" shadow="sm">
					<Stack gap="md">
						<Title order={3}>
							We're{" "}
							<Anchor inherit href="https://github.com/Moe-Hassan-123/share-secrets" target="_blank">
								Open Source
							</Anchor>
						</Title>

						<Text>
							We believe in transparency and community-driven development. Our <Mark>open-source approach</Mark> offers several benefits:
						</Text>

						<ol>
							<li>Code transparency: Anyone can inspect our code to verify our security claims</li>
							<li>Community contributions: Developers worldwide can help improve our service</li>
							<li>Rapid bug fixing: Open-source collaboration often leads to faster identification and resolution of issues</li>
							<li>Customization options: Tech-savvy users can modify and self-host our solution</li>
						</ol>

						<Text>
							You can view our code on github <Anchor>Here</Anchor>
						</Text>
					</Stack>
				</Paper>
			</Stack>

			<Modal opened={!!shareUrl} onClose={() => setShareUrl(null)} size="lg" title={<Title order={3}>Your Secret Link is Ready</Title>} centered>
				<Stack gap="md">
					<Text truncate>{shareUrl}</Text>

					<CopyButton value={shareUrl!} />
					<Text c="dimmed" size="sm">
						Remember: This link will only work once and expires in 24 hours.
					</Text>
				</Stack>
			</Modal>
		</Container>
	);
}
