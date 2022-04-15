class Todo {
  constructor() {
    this.todos = [];
  }

  addTodo(value) {
    this.todos.push({ id: parseInt(Math.random() * 1000).toString(), value });
  }
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
  updateTodo(id, valueToUpdate) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) return { id, value: valueToUpdate };
      else return todo;
    });
  }
  isEmpty() {
    return this.todos.length === 0;
  }
  getToDos() {
    return this.todos;
  }
}
