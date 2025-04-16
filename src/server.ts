import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import { Task } from "./entities/Task";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/v1", (req, res) => {
	res.json({ message: "The api is working" });
});

app.get("/api/v1/db", async (req, res) => {
	try {
		await AppDataSource.query("SELECT 1");
		res.json({ status: "ok", database: "is connected" });
	} catch (error) {
		res.status(500).json({ status: "not ok", database: "disconnected", error: error });
	}
});

app.post("/api/v1/test-task", async (req, res) => {
	try {
	  const taskRepository = AppDataSource.getRepository(Task);

	  const newTask = new Task();
	  newTask.title = "Test Task";
	  newTask.description = "This is a test task";
	  newTask.status = "Todo";
	  newTask.priority = "Low";
  
	  await taskRepository.save(newTask);
  
	  const tasks = await taskRepository.find();
	  
	  res.json({ message: "Task created successfully", tasks });
	} catch (error) {
	  res.status(500).json({ error: 'error to create task', details: error });
	}
  });

AppDataSource.initialize()
	.then(() => {
		console.log("db connection established");
		app.listen(PORT, () => {
			console.log(`server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("an error occurred connecting to the database: ", error);
		process.exit(1);
	});
