import { z } from "zod";

export const CreateSecret = z.object({
	secret: z.string(),
	extraInfoToReceiver: z.string().optional(),
	sendMethod: z.enum(["email", "url"]).optional(),
	receiverEmail: z.string().optional(),
});

export type CreateSecretRequest = z.infer<typeof CreateSecret>;
