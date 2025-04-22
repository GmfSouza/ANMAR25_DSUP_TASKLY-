import { AppDataSource } from "../config/database";
import { Task, Status } from "../entities/Task";
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

  async findByStatus(status: Status): Promise<Task[]> {
    return this.repository.find({ where: { status } });
  }

  async paginationAndFilters(
    page: number = 1,
    limit: number = 10,
    status?: Status,
    priority?: string,
    category?: string
  ): Promise<{ tasks: Task[], total: number }> {
    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (category) where.category = category;

    const skip = (page - 1) * limit;
    const [tasks, total] = await this.repository.findAndCount({
      where,
      skip,
      take: limit,
      order: { created_at: "DESC" },
    });

    return { tasks, total };
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}