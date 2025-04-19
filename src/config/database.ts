import { DataSource } from "typeorm";
import { Task } from "../entities/Task"
import { Note } from "../entities/Note"

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 3306,
	username: process.env.DB_USER || "tasksuser",
	password: process.env.DB_PASSWORD || "taskspassword",
	database: process.env.DB_NAME || "tasksapi",
	entities: [Task, Note],
	migrations: ["migrations/*.ts"],
	synchronize: false,
	logging: false,
});
