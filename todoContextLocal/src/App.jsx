import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/ToDoForm";
import TodoItem from "./components/ToDoItem";
import { TodoProvider } from "./contexts/TodoContext";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: new Date(), ...todo }, ...prev]);
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id != id));
  };
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id == id ? todo : prevTodo))
    );
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id == id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };
  useEffect(() => {
    const todosValues = JSON.parse(localStorage.getItem("todos"));
    if (todosValues && todosValues.length > 0) {
      setTodos(todosValues);
    }
  }, []);

  useEffect(() => {
    todos.length > 0 && localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>

          {todos.length > 0 &&
            todos.map((todo, index) => {
              return (
                <div className="mb-3 w-full" key={index}>
                  <TodoItem todo={todo} />
                </div>
              );
            })}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
