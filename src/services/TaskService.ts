import { TaskSchema, TaskDTO } from "../schemas/TaskSchema";
import { Task, Status, Priority } from "../entities/Task";
import { TaskRepository } from "../repositories/TaskRepository";

export class TaskService {
	private taskRepository: TaskRepository;

	constructor() {
		this.taskRepository = new TaskRepository();
	}

	async createTask(data: TaskDTO): Promise<Task> {
		const task = new Task();
		task.title = data.title;
		task.description = data.description;
		task.status = data.status as Status;
		task.priority = data.priority as Priority;
		task.category = data.category as string;

		return this.taskRepository.save(task);
	}

	async getAllTasks(
		page: number = 1,
		limit: number = 10,
		status?: Status,
		priority?: Priority,
		category?: string
	): Promise<{ tasks: Task[]; total: number }> {
		return this.taskRepository.paginationAndFilters(
			page,
			limit,
			status,
			priority,
			category
		);
	}

	async getTaskById(id: number): Promise<Task | null> {
		return this.taskRepository.findById(id);
	}

	async getTasksByStatus(status: Status): Promise<Task[]> {
		return this.taskRepository.findByStatus(status);
	}

	async updateTask(id: number, data: Partial<TaskDTO>): Promise<Task | null> {
		const task = await this.taskRepository.findById(id);
		if (!task) {
			return null;
		}

		Object.assign(task, {
			title: data.title ?? task.title,
			description: data.description ?? task.description,
			status: data.status ?? task.status,
			priority: data.priority ?? task.priority,
			category: data.category ?? task.category,
		});

		return this.taskRepository.save(task);
	}

	async deleteTaskById(id: number): Promise<boolean> {
		return this.taskRepository.delete(id);
	}
}
