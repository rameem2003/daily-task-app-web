import React, { useContext } from "react";
import { version } from "../constant/Version";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { Authcontext } from "../context/AuthContextProvider";
import { IoLogOut } from "react-icons/io5";

const Title = () => {
  const { currentUser } = useContext(Authcontext);
  console.log(currentUser);
  return (
    <div className=" w-full h-16 p-3 bg-primary flex items-center justify-between">
      <div className=" flex items-center">
        <img className=" w-[50px] h-[50px]" src="/icon.png" alt="" />
        <h1 className=" font-roboto font-semibold text-white text-lg xl:text-2xl">
          Daily Task
          <span className=" text-gray-300 text-[15px] italic"> v{version}</span>
        </h1>
      </div>

      <div className=" flex items-center gap-5">
        <img
          className="h-[40px] w-[40px] rounded-full object-cover"
          src={currentUser.photoURL}
          alt=""
        />
        <button onClick={() => signOut(auth)}>
          <IoLogOut className=" text-4xl text-white cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Title;
