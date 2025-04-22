import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
	private taskService: TaskService;

	constructor() {
		this.taskService = new TaskService();
	}

	async createTask(req: Request, res: Response): Promise<void> {
		const task = await this.taskService.createTask(req.body);
		res.status(201).json({ message: "task created successfully", task });
	}

	async getAllTasks(req: Request, res: Response): Promise<void> {
		const tasks = await this.taskService.getAllTasks();
		res.status(200).json(tasks);
	}

	async getTaskById(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id);
		const task = await this.taskService.getTaskById(id);
		if (!task) {
			res.status(404).json({ error: "task not found" });
		}
		res.status(200).json(task);
	}

	async updateTask(req: Request, res: Response): Promise<void> {
		const id = parseInt(req.params.id);
		const task = await this.taskService.updateTask(id, req.body);
        if(!task) {
            res.status(404).json({ error: "task not found" });
        }
        res.status(200).json({ message: "task updated"});
	}

    async deleteTaskById(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const task = await this.taskService.deleteTaskById(id)
        if(!task) {
            res.status(404).json({ error: "task not found" });
        }
        res.status(204).send();
    }
}
