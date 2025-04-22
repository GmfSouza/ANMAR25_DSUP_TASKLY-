import { TaskSchema } from "../schemas/TaskSchema";
import { Request, Response, NextFunction } from "express";

export const taskValidator = (partial: boolean = false) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			let schema;
			
			if (partial) {
				schema = TaskSchema.partial();
			} else {
				schema = TaskSchema;
			}
			schema.parse(req.body);
			next();
		} catch (error) {
			res.status(400).json({ error: "validation error", details: error });
		}
	};
};
