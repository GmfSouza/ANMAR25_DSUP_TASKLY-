import { TaskSchema, TaskDTO } from "../schemas/TaskSchema";
import { Task, Status, Priority } from "../entities/Task";
import { TaskRepository } from "../repositories/TaskRepository";

export class TaskService {
	private taskRepository: TaskRepository;
	constructor() {
		this.taskRepository = new TaskRepository();
	}

	async createTask(data: TaskDTO): Promise<Task> {
		const dataValidator = TaskSchema.parse(data);

		const task = new Task();
		task.title = dataValidator.title;
		task.description = dataValidator.description;
		task.status = dataValidator.status as Status;
		task.priority = dataValidator.priority as Priority;
		task.category = dataValidator.category ?? "";

		return this.taskRepository.save(task);
	}

	async getAllTasks(): Promise<Task[]> {
		return this.taskRepository.findAll();
	}

	async getTaskById(id: number): Promise<Task | null> {
		return this.taskRepository.findById(id);
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
