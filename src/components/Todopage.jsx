import React, { useContext, useState } from "react";
import Title from "./Title";
import TodoList from "./TodoList";
import UpdateTodo from "./UpdateTodo";
import { EditorContext } from "../context/EditorContextProvider";

const Todopage = () => {
  const { editor } = useContext(EditorContext);
  const [getTodo, setGetTodo] = useState({});

  const editTodo = (item) => {
    setGetTodo(item);
  };

  return (
    <div className="w-9/12 h-screen bg-gray-50">
      <Title />

      {editor ? (
        <UpdateTodo getTodo={getTodo} />
      ) : (
        <TodoList editTodo={editTodo} />
      )}
    </div>
  );
};

export default Todopage;
