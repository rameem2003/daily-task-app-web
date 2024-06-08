import React, { useContext, useState } from "react";
import Title from "./Title";
import TodoList from "./TodoList";
import UpdateTodo from "./UpdateTodo";
import { EditorContext } from "../context/EditorContextProvider";
import InputComponentForMobile from "./InputComponentForMobile";

const Todopage = () => {
  const { editor } = useContext(EditorContext);
  const [getTodo, setGetTodo] = useState({});

  const editTodo = (item) => {
    setGetTodo(item);
  };

  return (
    <div className=" w-full xl:w-9/12 h-screen bg-gray-50 relative">
      <Title />

      {editor ? (
        <UpdateTodo getTodo={getTodo} />
      ) : (
        <TodoList editTodo={editTodo} />
      )}

      <InputComponentForMobile />
    </div>
  );
};

export default Todopage;
