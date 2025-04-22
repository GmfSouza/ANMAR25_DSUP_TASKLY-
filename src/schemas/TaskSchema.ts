import { z } from "zod";
import { Status, Priority } from "../entities/Task";

const statusValues = Object.values(Status) as [string, ...string[]];
const priorityValues = Object.values(Priority) as [string, ...string[]];

export const TaskSchema = z.object({
	title: z
		.string()
		.min(1, { message: "title is required." })
		.max(100, { message: "title must be at most 100 characters." }),
	description: z
		.string()
		.min(1, { message: "description is required." })
		.max(255, { message: "description at most 255 characters." }),
	status: z
		.enum(statusValues, {
			message: "status must be one of: Todo, In-Progress, Done",
		})
		.optional()
		.default(Status.Todo),
	priority: z
		.enum(priorityValues, {
			message: "priority must be one of: Low, Medium, High",
		})
		.optional()
		.default(Priority.Low),
	category: z
		.string()
		.max(50, { message: "category must be at most 50 characters." })
		.optional(),
});

export type TaskDTO = z.infer<typeof TaskSchema>;
