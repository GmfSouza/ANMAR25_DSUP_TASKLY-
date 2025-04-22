import { Router } from "express";
import { NoteController } from "../controllers/NoteController";
import { validateNote } from "../middlewares/noteValidate";

const router = Router();
const noteController = new NoteController();

router.post("/tasks/:taskId/notes", validateNote(), (req, res) => noteController.createNote(req, res));
router.get("/tasks/:taskId/notes", (req, res) => noteController.getNoteByTaskId(req, res));
router.get("/notes/:id", (req, res) => noteController.getNoteById(req, res));
router.put("/notes/:id", validateNote(true), (req, res) => noteController.updateNote(req, res));
router.delete("/notes/:id", (req, res) => noteController.deleteNoteById(req, res));

export default router;