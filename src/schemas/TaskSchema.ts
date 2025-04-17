import {z} from "zod";

const createTask = z.object({
    title: z.string().min(1, {message: "title is required."}).max(100, {message: "title must be at most 100 characters."}),
    description: z.string().min(1, {message: "description is required."}).max(255, {message: "description at most 255 characters."}),
    status: z.enum(["Todo", "In-Progress", "Done"], {message: "status must be one of: Todo, In-Progress, Done."}),
    priority: z.enum(["Low", "Medium", "High"], {message: "priority must be one of: Low, Medium, High."}),
    category: z.string().max(50, {message: "category must be at most 50 characters. "}).optional(),
});