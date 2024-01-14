import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className=" w-full h-[90%] flex items-center justify-center flex-col gap-5">
      <MagnifyingGlass
        visible={true}
        height="200"
        width="200"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#00A551"
      />

      <h1 className=" font-roboto font-medium text-4xl text-primary">
        Loading.......
      </h1>
    </div>
  );
};

export default Loading;
