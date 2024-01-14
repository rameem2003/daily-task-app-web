import React, { useContext } from "react";
import { database } from "../Firebase";
import { ref, remove } from "firebase/database";
import { Authcontext } from "../context/AuthContextProvider";
import { PiTrashSimpleFill } from "react-icons/pi";
import { FaPen } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = ({ item }) => {
  const { currentUser } = useContext(Authcontext);

  const deleteTodo = (item) => {
    console.log("click");
    remove(ref(database, `todos/${currentUser.uid}/${item.todoID}`)).then(
      () => {
        toast.info("Delete Success", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    );
  };

  return (
    <>
      <div className=" flex items-center justify-between my-3 p-4 w-full bg-green-200 rounded-md duration-200 cursor-pointer hover:bg-green-400">
        <h3 className=" font-roboto font-semibold capitalize text-2xl">
          {item.task}
        </h3>
        <div className=" flex items-center gap-4">
          <div className=" cursor-pointer h-10 w-10 bg-white rounded-full flex items-center justify-center duration-150 hover:bg-yellow-400">
            <FaPen size={20} />
          </div>

          <div
            onClick={() => deleteTodo(item)}
            className=" cursor-pointer h-10 w-10 bg-red-500 text-white rounded-full flex items-center justify-center"
          >
            <PiTrashSimpleFill size={20} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Todo;
