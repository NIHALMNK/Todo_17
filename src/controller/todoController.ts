import { Request, Response } from 'express';
import Todo from '../models/todoModel';

// CREATE
export const createTodo = async (req: Request, res: Response) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create todo' });
  }
};

// READ
export const getTodos = async (_req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// UPDATE
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update todo' });
  }
};

// DELETE
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete todo' });
  }
};
