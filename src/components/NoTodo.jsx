import React from "react";
import notFound from "../assets/notfound.png";

const NoTodo = () => {
  return (
    <div className=" w-full flex items-center justify-center flex-col">
      <img className=" w-[600px] h-[600px]" src={notFound} alt="" />
      <h2 className=" font-roboto font-medium text-4xl text-center text-red-600">
        You haven't any todo right now. Add new todo
      </h2>
    </div>
  );
};

export default NoTodo;
