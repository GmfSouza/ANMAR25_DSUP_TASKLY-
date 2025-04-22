import { Request, Response } from 'express';
import { NoteService } from '../services/NoteService';
import { Note } from '../entities/Note';

export class NoteController {
    private noteService: NoteService;

    constructor() {
        this.noteService = new NoteService();
    }

    async createNote(req: Request, res: Response): Promise<void> {
        try {
            const taskId = parseInt(req.params.taskId, 10);
            if (isNaN(taskId)) {
                res.status(400).json({ error: "Invalid taskId", details: "taskId must be a valid number" });
                return;
            }
            const noteData = { ...req.body, taskId };
            const note = await this.noteService.createNote(noteData);
            res.status(201).json({ message: 'note created successfully', note });
        } catch (error: any) {
            if (error.name === "ZodError") {
                res.status(400).json({ error: "Validation failed", details: error.message });
            } else if (error.message === "Task not found") {
                res.status(404).json({ error: "Task not found" });
            } else {
                res.status(500).json({ error: "failed to create note", details: error });
            }
        }
    }

    async getNoteById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ error: "Invalid id", details: "id must be a valid number" });
                return;
            }
            const note = await this.noteService.getNoteById(id);
            if (!note) {
                res.status(404).json({ error: "note not found" });
                return;
            }
            res.status(200).json(note);
        } catch (error: any) {
            res.status(500).json({ error: "failed to get note", details: error });
        }
    }

    async getNoteByTaskId(req: Request, res: Response): Promise<void> {
        try {
            const taskId = parseInt(req.params.taskId, 10);
            if (isNaN(taskId)) {
                res.status(400).json({ error: "Invalid taskId", details: "taskId must be a valid number" });
                return;
            }
            const page = parseInt(req.query.page as string, 10) || 1;
            const limit = parseInt(req.query.limit as string, 10) || 10;

            if (page < 1 || limit < 1) {
                res.status(400).json({ error: "Invalid pagination parameters", details: "page and limit must be positive integers" });
                return;
            }

            const { notes, total } = await this.noteService.getNotesByTaskId(taskId, page, limit);
            if (!notes || notes.length === 0) {
                res.status(404).json({ error: "no notes found for this task" });
                return;
            }
            res.status(200).json({
                notes,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            });
        } catch (error: any) {
            if (error.message === "Task not found") {
                res.status(404).json({ error: "Task not found" });
            } else {
                res.status(500).json({ error: "failed to get notes", details: error });
            }
        }
    }

    async updateNote(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ error: "Invalid id", details: "id must be a valid number" });
                return;
            }
            const note = await this.noteService.updateNote(id, req.body);
            if (!note) {
                res.status(404).json({ error: "note not found" });
                return;
            }
            res.status(200).json({ message: "note updated successfully", note });
        } catch (error: any) {
            if (error.name === "ZodError") {
                res.status(400).json({ error: "Validation failed", details: error.message });
            } else if (error.message === "Task not found") {
                res.status(404).json({ error: "Task not found" });
            } else {
                res.status(500).json({ error: "failed to update note", details: error });
            }
        }
    }

    async deleteNoteById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ error: "Invalid id", details: "id must be a valid number" });
                return;
            }
            const deleted = await this.noteService.deleteNote(id);
            if (!deleted) {
                res.status(404).json({ error: "note not found" });
                return;
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: "failed to delete note", details: error });
        }
    }
}