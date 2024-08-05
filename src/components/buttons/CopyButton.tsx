import { Button, Group, CopyButton as MantineCopyButton } from "@mantine/core";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";

export default function CopyButton({ value }: { value: string }) {
	return (
		<MantineCopyButton value={value} timeout={2500}>
			{(props) => {
				if (props.copied) {
					return (
						<Button bg="green">
							<Group gap={"xs"}>
								<IconCopyCheck />
								Done
							</Group>
						</Button>
					);
				}

				return (
					<Button onClick={props.copy}>
						<Group gap="xs">
							<IconCopy />
							Copy
						</Group>
					</Button>
				);
			}}
		</MantineCopyButton>
	);
}
