import { AppDataSource } from "../config/database";
import { Task } from "../entities/Task";
import { Repository } from "typeorm";


export class TaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async save(task: Task): Promise<Task> {
    return this.repository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Task | null> {
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
