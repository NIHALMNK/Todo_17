"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todoModel_1 = __importDefault(require("../models/todoModel"));
// CREATE
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = yield todoModel_1.default.create(req.body);
        res.status(201).json(newTodo);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to create todo' });
    }
});
exports.createTodo = createTodo;
// READ
const getTodos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoModel_1.default.find();
        res.json(todos);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});
exports.getTodos = getTodos;
// UPDATE
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield todoModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to update todo' });
    }
});
exports.updateTodo = updateTodo;
// DELETE
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield todoModel_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to delete todo' });
    }
});
exports.deleteTodo = deleteTodo;
