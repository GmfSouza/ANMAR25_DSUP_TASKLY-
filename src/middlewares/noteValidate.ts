import { Request, Response, NextFunction } from "express";
import { NoteSchema } from "../schemas/NoteSchema";

export const validateNote = (partial: boolean = false) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            let schema = partial ? NoteSchema.partial() : NoteSchema;
            schema.parse(req.body);
            next();
        } catch (error: any) {
            res.status(400).json({ error: "Validation failed", details: error.message });
        }
    };
};