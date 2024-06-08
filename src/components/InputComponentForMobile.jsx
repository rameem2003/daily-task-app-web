import React, { useContext, useState } from "react";
import { ref, set } from "firebase/database";
import { database } from "../Firebase";
import { Authcontext } from "../context/AuthContextProvider";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { FaCirclePlus } from "react-icons/fa6";

const InputComponentForMobile = () => {
  const [todo, setTodo] = useState("");
  const { currentUser } = useContext(Authcontext);

  const handleTodo = async (e) => {
    e.preventDefault();

    if (!todo) {
      toast.error("Opps! You Can't Left Field Empty", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      let todoID = uuidv4();
      await set(ref(database, `todos/${currentUser.uid}/${todoID}`), {
        todoID: todoID,
        task: todo,
        complete: false,
        time: new Date().toLocaleTimeString(),
        date: new Date().toDateString(),
      }).then(() => {
        toast.success("Task Added", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    }

    setTodo("");
  };
  return (
    <div className=" block xl:hidden bg-primary px-6 py-2 absolute left-0 bottom-0 w-full">
      <ToastContainer />
      <form action="" className=" flex items-center gap-6">
        <div className="relative w-[70%]">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            id="floating_helper"
            aria-describedby="floating_helper_text"
            className="block rounded-md px-2.5 pb-1 pt-5 w-full font-roboto font-medium text-xl text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_helper"
            className="absolute font-roboto font-medium text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-2.5 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            What's your plan ?
          </label>
        </div>

        <button
          onClick={handleTodo}
          className="h-full flex items-center justify-center w-[30%] p-2 font-roboto font-semibold text-balance text-primary bg-white rounded-md border-2 border-white duration-100 hover:bg-primary hover:text-white"
        >
          <FaCirclePlus className="text-3xl" />
        </button>
      </form>
    </div>
  );
};

export default InputComponentForMobile;
