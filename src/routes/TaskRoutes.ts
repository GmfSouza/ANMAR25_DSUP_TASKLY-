import { AppDataSource } from "../config/database";
import { Router } from "express";
import { Task, Status, Priority } from "../entities/Task";

const router = Router();

router.post("/test-task", async (req, res) => {
	try {
		const taskRepository = AppDataSource.getRepository(Task);

		const newTask = new Task();
		newTask.title = "Task 5";
		newTask.description = "test task";
		newTask.status = Status.Done;
		newTask.priority = Priority.Low;

		await taskRepository.save(newTask);

		const tasks = await taskRepository.find();

		res.json({ message: "Task created successfully", tasks });
	} catch (error) {
		res.status(500).json({ error: "error to create task", details: error });
	}
});

export default router;
