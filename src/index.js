import "./styles.css";
import { Todo, TodoList } from "./classes";

const todoList = new TodoList();

const tarea = new Todo("Aprender Javascript");

todoList.nuevoTodo(tarea);

console.log(todoList);
