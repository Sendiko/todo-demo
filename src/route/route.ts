// @ts-nocheck
import express from 'express';
import TodoController from '../controller/todo_controller';
import upload from '../middleware/upload';

const router = express.Router();

router.get("/todos", TodoController.index);
router.get("/todo/:id", TodoController.show)
router.post("/todo", upload.single("image"), TodoController.store);
router.put("/todo/:id", upload.single("image"), TodoController.update);
router.delete("/todo/:id", TodoController.destory);

export default router;