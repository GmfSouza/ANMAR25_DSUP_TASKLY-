import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";

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
