import { date, z } from "zod";

export const CreateSecret = z.object({
	secret: z.string(),
	extraInfoToReceiver: z.string().optional(),
	sendMethod: z.enum(["email", "url"]).optional(),
	receiverEmail: z.string().optional(),
	expiresIn: z.date().optional(),
});

export type CreateSecretRequest = z.infer<typeof CreateSecret>;
