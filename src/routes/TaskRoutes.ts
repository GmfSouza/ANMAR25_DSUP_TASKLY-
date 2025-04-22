import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { taskValidator } from "../middlewares/taskValidate";

const router = Router();
const taskController = new TaskController();

router.post("/", taskValidator(), (req, res) => taskController.createTask(req, res));
router.get("/", (req, res) => taskController.getAllTasks(req, res));
router.get("/:id", (req, res) => taskController.getTaskById(req, res));
router.put("/:id", taskValidator(true), (req, res) => taskController.updateTask(req, res));
router.delete("/:id", (req, res) => taskController.deleteTaskById(req, res));

export default router;