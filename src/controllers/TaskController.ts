import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { Status, Priority } from "../entities/Task";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const task = await this.taskService.createTask(req.body);
      res.status(201).json({ message: "task created successfully", task });
    } catch (error) {
      res.status(500).json({ error: "failed to create task", details: error });
    }
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const status = req.query.status as Status | undefined;
      const priority = req.query.priority as Priority | undefined;
      const category = req.query.category as string | undefined;

      if (page < 1 || limit < 1) {
        res.status(400).json({ error: "Invalid pagination parameters", details: "page and limit must be positive integers" });
        return;
      }

      const { tasks, total } = await this.taskService.getAllTasks(page, limit, status, priority, category);
      res.status(200).json({
        tasks,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ error: "failed to list tasks", details: error });
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid id", details: "id must be a valid number" });
        return;
      }
      const task = await this.taskService.getTaskById(id);
      if (!task) {
        res.status(404).json({ error: "task not found" });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "failed to get task", details: error });
    }
  }

  async getTasksByStatus(req: Request, res: Response): Promise<void> {
    try {
      const status = req.query.status as Status;
      const tasks = await this.taskService.getTasksByStatus(status);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "failed to get tasks by status", details: error });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid id", details: "id must be a valid number" });
        return;
      }
      const task = await this.taskService.updateTask(id, req.body);
      if (!task) {
        res.status(404).json({ error: "task not found" });
        return;
      }
      res.status(200).json({ message: "task updated" });
    } catch (error) {
      res.status(500).json({ error: "failed to update task", details: error });
    }
  }

  async deleteTaskById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid id", details: "id must be a valid number" });
        return;
      }
      const task = await this.taskService.deleteTaskById(id);
      if (!task) {
        res.status(404).json({ error: "task not found" });
        return;
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: "failed to delete task", details: error });
    }
  }
}