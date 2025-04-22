import "reflect-metadata"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import TaskRoutes from "./routes/TaskRoutes"
import NoteRoutes from "./routes/NoteRoutes"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/tasks', TaskRoutes);
app.use('/', NoteRoutes);
app.use((req, res) => {
	res.status(404).json({ error: "route not found" });
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
