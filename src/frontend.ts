const apiUrl = "http://localhost:3000/api/todos";

const form = document.getElementById('todo-form') as HTMLFormElement;
const input = document.getElementById('todo-input') as HTMLInputElement;
const list = document.getElementById('todo-list') as HTMLUListElement;

// Create todo
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = '';
  loadTodos();
});

// Load and display todos
async function loadTodos() {
  const res = await fetch(apiUrl);
  const todos = await res.json();

  list.innerHTML = '';

  todos.forEach((todo: any) => {
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
      saveBtn.onclick = async () => {
        await updateTodoText(todo._id, editInput.value);
        loadTodos();
      };

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
}

// Update text
async function updateTodoText(id: string, newText: string) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: newText })
  });
}

// Mark completed or undo
async function toggleComplete(id: string, status: boolean) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: status })
  });
  loadTodos();
}

// Delete todo
async function deleteTodo(id: string) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });
  loadTodos();
}

// Initial load
loadTodos();
