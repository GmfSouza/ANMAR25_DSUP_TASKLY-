import { z } from "zod";

export const NoteSchema = z.object({
    content: z
        .string()
        .min(1, { message: "content is required" })
        .max(150, { message: "content must be at most 150 characters" }),
});

export type NoteDTO = z.infer<typeof NoteSchema>;