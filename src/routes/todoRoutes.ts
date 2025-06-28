import express from 'express';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from '../controller/todoController';

const router = express.Router();

router.post('/todos', createTodo);        // Create
router.get('/todos', getTodos);           // Read
router.put('/todos/:id', updateTodo);     // Update
router.delete('/todos/:id', deleteTodo);  // Delete

export default router;
