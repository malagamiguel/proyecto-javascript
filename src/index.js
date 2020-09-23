import "./styles.css";
import { Todo, TodoList } from "./classes";
import { crearTodoHtml } from "./js/componentes";

export const todoList = new TodoList();

todoList.todos.forEach((todo) => crearTodoHtml(todo));
// Es lo mismo
// todoList.todos.forEach(crearTodoHtml());

// Usando localstorage
// localStorage.setItem("mi-key", "abc123");

// Usando sesionstorage
// sessionStorage.setItem("mi-key", "abc123");

// setTimeout(() => {
//   localStorage.removeItem("mi-key");
// }, 1500);
