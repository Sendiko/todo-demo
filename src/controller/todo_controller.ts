import { Request, Response } from "express";
import Todo from "../models/Todo";

const TodoController = {
  index: async (req: Request, res: Response) => {
    try {
      // "https://balblaba.com/todos?userId=example@example.com";
      const userId = req.query.userId // example@example.com
      const todos = await Todo.findAll({
        where: {
          userId: userId // example@example.com
        }
      })

      return res.status(200).json({
        status: 200,
        message: "Todos sent successfully.",
        todos: todos
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error fetching todos: ${error.message}`
      })
    }
  },
  show: async (req: Request, res: Response) => {
    try {
      // "https://balblaba.com/todos/1";
      const todoId = req.params.id // 1
      const todo = await Todo.findByPk(todoId)

      if (todo == null) {
        return res.status(404).json({
          status: 404,
          message: "Todo not found."
        })
      }

      return res.status(200).json({
        status: 200,
        message: "Todo sent successfully.",
        todo: todo
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error fetching todos: ${error.message}`
      })
    }
  },
  store: async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "Image file is required."
        })
      }

      // "https://balblaba.com/public/images/aslfjskdfjka.jpg";
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const imageUrl = `${baseUrl}/public/images/${req.file.filename}`; // Penting untuk disesuaikan dengan direktori yang diinginkan

      const todo = await Todo.create({
        ...req.body,
        imageUrl: imageUrl,
      })

      return res.status(201).json({
        status: 201,
        message: "Todo created successfully.",
        todo: todo
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error fetching todos: ${error.message}`
      })
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      // "https://balblaba.com/todos/1";
      const todoId = req.params.id // 1
      const todo = await Todo.findByPk(todoId);

      if (todo == null) {
        return res.status(404).json({
          status: 404,
          message: "Todo not found."
        })
      }

      if (req.file) {
        // "https://balblaba.com/public/images/aslfjskdfjka.jpg";
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const imageUrl = `${baseUrl}/public/images/${req.file.filename}`; // Penting untuk disesuaikan dengan direktori yang diinginkan
        req.body.imageUrl = imageUrl;
      }

      await todo.update(req.body)

      return res.status(200).json({
        status: 200,
        message: "Todo updated successfully.",
        todo: todo
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error fetching todos: ${error.message}`
      })
    }
  },
  destory: async (req: Request, res: Response) => {
    try {
      // "https://balblaba.com/todos/1";
      const todoId = req.params.id // 1
      const todo = await Todo.findByPk(todoId);

      if (todo == null) {
        return res.status(404).json({
          status: 404,
          message: "Todo not found."
        })
      }
      await todo.destroy();
      return res.status(200).json({
        status: 200,
        message: "Todo deleted successfully."
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error fetching todos: ${error.message}`
      })
    }
  }
}

export default TodoController;  