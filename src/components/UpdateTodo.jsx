import React, { useContext, useState } from "react";
import { database } from "../Firebase";
import { ref, update } from "firebase/database";
import { Authcontext } from "../context/AuthContextProvider";
import { EditorContext } from "../context/EditorContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateTodo = ({ getTodo }) => {
  //   console.log(getTodo);
  const { currentUser } = useContext(Authcontext);
  const { setEditor } = useContext(EditorContext);
  const [newTodo, setNewTodo] = useState("");

  const todoUpdate = () => {
    if (!newTodo) {
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
      update(ref(database, `todos/${currentUser.uid}/${getTodo.todoID}`), {
        task: newTodo,
      }).then(() => {
        setEditor(false);

        toast.success("Update Success", {
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
  };

  return (
    <>
      <ToastContainer />
      <div className=" w-full h-screen flex items-center justify-center bg-white/30 backdrop-blur-[0.5px]">
        <div className=" w-96 h-52 bg-white rounded-md shadow-lg p-3">
          <h3 className=" font-roboto font-semibold text-3xl text-center">
            Update Your Todo {getTodo.task}
          </h3>

          <div className="relative mt-3">
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              type="text"
              id="floating_helper_update"
              aria-describedby="floating_helper_text"
              className="block rounded-md px-2.5 pb-2.5 pt-5 w-full font-roboto font-medium text-xl text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
            />
            <label
              htmlFor="floating_helper_update"
              className="absolute font-roboto font-medium text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-2.5 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Change Your Plan ....
            </label>

            <div className=" flex">
              <button
                onClick={todoUpdate}
                className="mt-5 w-1/2 p-2 font-roboto font-semibold text-base text-white bg-primary rounded-md border-2 border-white duration-100 hover:bg-green-800"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setEditor(false);
                }}
                className="mt-5 w-1/2 p-2 font-roboto font-semibold text-base text-white bg-red-500 rounded-md border-2 border-white duration-100 hover:bg-red-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTodo;
