import { createContext, useContext } from "react";

const TodeContext = createContext({
  todos: [{ id: 1, todo: "add item here", completed: false }],
  addTodo: () => {},
  deleteTodo: (id) => {},
  updateTodo: (id) => {},
  toggleComplete: (id) => {},
});

export const useTodo = () => {
  return useContext(TodeContext);
};

export const TodoProvider = TodeContext.Provider;
