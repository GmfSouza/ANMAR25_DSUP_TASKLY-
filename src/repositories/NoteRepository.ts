import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Note } from "../entities/Note";

export class NoteRepository {
    private repository: Repository<Note>;

    constructor() {
        this.repository = AppDataSource.getRepository(Note);
    }

    async save(note: Note): Promise<Note> {
        return this.repository.save(note);
    }

    async findById(id: number): Promise<Note | null> {
        return this.repository.findOne({ where: { id }, relations: ["task"] });
    }

    async findByTaskId(taskId: number, page: number = 1, limit: number = 10): Promise<{ notes: Note[], total: number }> {
        const skip = (page - 1) * limit;
        const [notes, total] = await this.repository.findAndCount({
            where: { task: { id: taskId } },
            relations: ["task"],
            skip,
            take: limit,
            order: { created_at: "DESC" },
        });
        return { notes, total };
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}