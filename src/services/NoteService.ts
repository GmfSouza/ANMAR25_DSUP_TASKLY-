import { Note } from "../entities/Note";
import { Task } from "../entities/Task";
import { NoteDTO } from "../schemas/NoteSchema";
import { NoteRepository } from "../repositories/NoteRepository";
import { TaskRepository } from "../repositories/TaskRepository";

export class NoteService {
    private noteRepository: NoteRepository;
    private taskRepository: TaskRepository;

    constructor() {
        this.noteRepository = new NoteRepository();
        this.taskRepository = new TaskRepository();
    }

    async createNote(data: NoteDTO & { taskId: number }): Promise<Note> {
        const task = await this.taskRepository.findById(data.taskId);
        if (!task) {
            throw new Error("Task not found");
        }

        const note = new Note();
        note.content = data.content;
        note.task = task;

        return this.noteRepository.save(note);
    }

    async getNoteById(id: number): Promise<Note | null> {
        return this.noteRepository.findById(id);
    }

    async getNotesByTaskId(taskId: number, page: number = 1, limit: number = 10): Promise<{ notes: Note[], total: number }> {
        const task = await this.taskRepository.findById(taskId);
        if (!task) {
            throw new Error("Task not found");
        }

        return this.noteRepository.findByTaskId(taskId, page, limit);
    }

    async updateNote(id: number, data: Partial<NoteDTO> & { taskId?: number }): Promise<Note | null> {
        const note = await this.noteRepository.findById(id);
        if (!note) {
            return null;
        }

        if (data.taskId) {
            const task = await this.taskRepository.findById(data.taskId);
            if (!task) {
                throw new Error("Task not found");
            }
            note.task = task;
        }

        if (data.content) {
            note.content = data.content;
        }

        return this.noteRepository.save(note);
    }

    async deleteNote(id: number): Promise<boolean> {
        return this.noteRepository.delete(id);
    }
}