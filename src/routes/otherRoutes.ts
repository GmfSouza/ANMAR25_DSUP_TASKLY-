import { AppDataSource } from "../config/database";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	res.json({ message: "The api is working" });
});

router.get("/db", async (req, res) => {
	try {
		await AppDataSource.query("SELECT 1");
		res.json({ status: "ok", database: "is connected" });
	} catch (error) {
		res
			.status(500)
			.json({ status: "not ok", database: "disconnected", error: error });
	}
});

export default router;
