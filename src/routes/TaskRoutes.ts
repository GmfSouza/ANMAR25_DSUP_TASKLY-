import { AppDataSource } from "../config/database";
import { Router } from "express";
import { Task } from "../entities/Task";

const router = Router();

router.post("/test-task", async (req, res) => {
	try {
		const taskRepository = AppDataSource.getRepository(Task);

		const newTask = new Task();
		newTask.title = "Test Task3";
		newTask.description = "This is a test task3";
		newTask.status = "Todo";
		newTask.priority = "Medium";

		await taskRepository.save(newTask);

		const tasks = await taskRepository.find();

		res.json({ message: "Task created successfully", tasks });
	} catch (error) {
		res.status(500).json({ error: "error to create task", details: error });
	}
});

export default router;
