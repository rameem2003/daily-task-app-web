import React, { useContext } from "react";
import Title from "./Title";
import TodoList from "./TodoList";

const Todopage = () => {
  return (
    <div className="w-9/12 h-screen bg-gray-50">
      <Title />
      <TodoList />
    </div>
  );
};

export default Todopage;
