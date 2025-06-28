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
const apiUrl = "http://localhost:3000/api/todos";
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
// Create todo
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const text = input.value.trim();
    if (!text)
        return;
    yield fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    input.value = '';
    loadTodos();
}));
// Load and display todos
function loadTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(apiUrl);
        const todos = yield res.json();
        list.innerHTML = '';
        todos.forEach((todo) => {
            const li = document.createElement('li');
            const textSpan = document.createElement('span');
            textSpan.innerText = todo.text;
            if (todo.completed) {
                textSpan.style.textDecoration = 'line-through';
            }
            // ✅ Complete/Undo Button
            const completeBtn = document.createElement('button');
            completeBtn.innerText = todo.completed ? 'Undo' : 'Done';
            completeBtn.onclick = () => toggleComplete(todo._id, !todo.completed);
            // ✅ Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.onclick = () => deleteTodo(todo._id);
            // ✅ Edit Button
            const editBtn = document.createElement('button');
            editBtn.innerText = 'Edit';
            editBtn.onclick = () => {
                const editInput = document.createElement('input');
                editInput.value = todo.text;
                const saveBtn = document.createElement('button');
                saveBtn.innerText = 'Save';
                saveBtn.onclick = () => __awaiter(this, void 0, void 0, function* () {
                    yield updateTodoText(todo._id, editInput.value);
                    loadTodos();
                });
                li.innerHTML = '';
                li.appendChild(editInput);
                li.appendChild(saveBtn);
            };
            li.appendChild(textSpan);
            li.appendChild(completeBtn);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            list.appendChild(li);
        });
    });
}
// Update text
function updateTodoText(id, newText) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newText })
        });
    });
}
// Mark completed or undo
function toggleComplete(id, status) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: status })
        });
        loadTodos();
    });
}
// Delete todo
function deleteTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        loadTodos();
    });
}
// Initial load
loadTodos();
