import React, { ReactNode } from "react";
import { Anchor } from "@mantine/core";
import { Container, Title, Text, List, ListItem, Paper, Stack, Group, ThemeIcon } from "@mantine/core";
import { IconLock, IconEye, IconServer, IconKey, IconShield, IconNotes, IconRefresh, IconQuestionMark } from "@tabler/icons-react";

export default function SecurityCommitmentPage() {
	return (
		<Container size="lg">
			<Paper shadow="md" p="xl" mt="xl">
				<Title order={1} ta="center" mb="xl">
					Our Commitment to Your Security
				</Title>
				<Text>
					At SecureShare, we take the security and privacy of your shared secrets seriously. Our platform is designed with state-of-the-art encryption and security measures to ensure that
					your sensitive information remains confidential and protected. Here's how we safeguard your data:
				</Text>

				<Stack gap="xl" mt="xl">
					<SecuritySection
						icon={<IconLock size={20} />}
						title="Open Source Transparency"
						content="We believe in the power of transparency to enhance security. That's why our software is open source:"
						items={[
							"Our entire codebase is publicly available for review.",
							"Security experts and developers worldwide can inspect, validate, and contribute to our security measures.",
							"You don't have to take our word for it – you can see exactly how we protect your data.",
						]}
					/>

					<SecuritySection
						icon={<IconKey size={20} />}
						title="End-to-End Encryption"
						content="We use advanced AES-GCM (Advanced Encryption Standard in Galois/Counter Mode) encryption to protect your secrets. This means:"
						items={[
							"Your secret is encrypted on your device before it ever reaches our servers.",
							"We never see or store your unencrypted secret.",
							"Only the intended recipient with the correct decryption key can read the secret.",
						]}
					/>

					<SecuritySection
						icon={<IconEye size={20} />}
						title="One-Time Viewing"
						content="To further enhance security:"
						items={[
							"Each secret can be viewed only once.",
							"After viewing, the secret is permanently deleted from our servers.",
							"Subsequent attempts to access the same link will show that the secret has already been viewed.",
						]}
					/>

					<SecuritySection
						icon={<IconServer size={20} />}
						title="Secure Storage"
						content="While your encrypted secret is stored on our servers:"
						items={[
							"It's kept in a secure database with strict access controls.",
							"We use Amazon Web Services (AWS), a leader in cloud security, to host our infrastructure.",
							"Your secret is associated with a randomly generated public ID, not your personal information.",
						]}
					/>

					<SecuritySection
						icon={<IconShield size={20} />}
						title="Secure Transmission"
						content="We ensure secure data transmission:"
						items={[
							"All data transmitted between your device and our servers is protected using HTTPS.",
							"We employ additional encryption on top of HTTPS for an extra layer of security.",
						]}
					/>

					<SecuritySection
						icon={<IconNotes size={20} />}
						title="No Logging of Sensitive Data"
						content="We prioritize your privacy:"
						items={["We don't log or store the contents of your secrets.", "Once a secret is viewed and deleted, it's gone forever."]}
					/>

					<SecuritySection
						icon={<IconQuestionMark size={20} />}
						title="How It Works"
						content=""
						items={[
							<span key={0}>
								<strong>Encryption:</strong> When you create a secret, it's encrypted with a unique key generated just for that secret.
							</span>,
							<span key={1}>
								<strong>Storage:</strong> Only the encrypted version of your secret is stored on our servers.
							</span>,
							<span key={2}>
								<strong>Sharing:</strong> You receive a secure link containing the secret's ID and the decryption key.
							</span>,
							<span key={3}>
								<strong>Viewing:</strong> When the recipient opens the link, the encrypted secret is retrieved and decrypted in their browser.
							</span>,
							<span key={4}>
								<strong>Deletion:</strong> After viewing, the encrypted secret is immediately and permanently deleted from our servers.
							</span>,
						]}
					/>

					<SecuritySection
						icon={<IconRefresh size={20} />}
						title="Your Role in Security"
						content="While we provide a secure platform, you play a crucial role in maintaining the confidentiality of your shared secrets:"
						items={[
							"Ensure the intended recipient is the only one with access to the secure link.",
							"Encourage recipients to view the secret promptly, as it will be permanently deleted after viewing.",
						]}
					/>

					<SecuritySection
						icon={<IconShield size={20} />}
						title="Verifying Our Security"
						content="We encourage you to:"
						items={[
							<span key={0}>
								Review our open-source code on{" "}
								<Anchor href="https://github.com/Moe-Hassan-123/secretShare" target="_blank">
									Github
								</Anchor>
								.
							</span>,
							"Contribute to our project if you have suggestions for improvements.",
							"Report any security concerns through our responsible disclosure program.",
						]}
					/>
				</Stack>

				<Text mt="xl">
					At SecureShare, we're committed to continuously improving our security measures to provide you with the most secure secret-sharing experience possible. Our open-source approach
					ensures that this commitment is transparent and verifiable.
				</Text>
			</Paper>
		</Container>
	);
}

type SecuritySectionProps = {
	icon: React.ReactNode;
	title: string;
	content: string;
	items: ReactNode[];
};

const SecuritySection = ({ icon, title, content, items }: SecuritySectionProps) => (
	<div>
		<Group mb="md">
			<ThemeIcon size="lg" variant="dark" color="golden">
				{icon}
			</ThemeIcon>

			<Title order={2}>{title}</Title>
		</Group>
		<Text>{content}</Text>
		<List spacing="xs" mt="sm">
			{items.map((item, index) => (
				<ListItem key={index}>{item}</ListItem>
			))}
		</List>
	</div>
);
