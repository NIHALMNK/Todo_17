"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const router = express_1.default.Router();
router.post('/todos', todoController_1.createTodo); // Create
router.get('/todos', todoController_1.getTodos); // Read
router.put('/todos/:id', todoController_1.updateTodo); // Update
router.delete('/todos/:id', todoController_1.deleteTodo); // Delete
exports.default = router;
