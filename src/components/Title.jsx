import React from "react";

const Title = () => {
  return (
    <div className=" w-full h-16 p-3 bg-primary flex items-center">
      <h1 className=" font-roboto font-semibold text-white text-2xl">
        Daily Task{" "}
        <span className=" text-gray-300 text-[15px]">
          {" "}
          v 0.0.1 Developer Preview
        </span>
      </h1>
    </div>
  );
};

export default Title;
