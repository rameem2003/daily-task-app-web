import React, { useContext, useEffect, useState } from "react";
import About from "../pages/About";
import { auth, database } from "../Firebase";
import { signOut } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import { Authcontext } from "../context/AuthContextProvider";
import { SettingContext } from "../context/SettingContextProvider";
import { v4 as uuidv4 } from "uuid";
import { IoMdSettings } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { Chart } from "react-google-charts";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  const { currentUser } = useContext(Authcontext);
  const { setSetting } = useContext(SettingContext);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [about, setAbout] = useState(false);

  useEffect(() => {
    const starCountRef = ref(database, "todos/" + currentUser.uid);
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });

      setTodos(arr);
    });
  }, []);

  const completeTask = todos.filter((item) => item.complete == true);
  const notCompleteTask = todos.filter((item) => item.complete == false);

  const data = [
    ["Task", "Hours per Day"],
    ["Complete", completeTask.length],
    ["Incomplete", notCompleteTask.length],
  ];

  const options = {
    title: "Statistics",
    pieHole: 0.4,
    is3D: true,
  };

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
    <div className=" hidden xl:block xl:w-3/12 p-6 bg-primary h-screen overflow-y-scroll no-scrollbar relative">
      <ToastContainer />
      {/* profile start */}
      <div className=" flex items-center justify-between gap-3">
        <img
          src={currentUser.photoURL}
          className="h-[60px] w-[60px] rounded-full object-cover"
          alt=""
        />
        <div className="w-full">
          <h5 className=" font-roboto font-normal text-white text-xl">
            Welcome,{" "}
          </h5>
          <h1 className=" font-roboto font-bold text-[22px] text-white">
            {currentUser.displayName}
          </h1>
        </div>

        <button
          onClick={() => setSetting(true)}
          className=" font-roboto font-semibold text-2xl text-center text-gray-300 duration-150 hover:rotate-12"
        >
          <IoMdSettings size={30} />
        </button>
      </div>

      <button
        onClick={() => signOut(auth)}
        className="mt-5 w-full p-2 font-roboto font-semibold text-xl text-white rounded-md border-2 border-white duration-100 hover:bg-white hover:text-primary"
      >
        Logout {currentUser.displayName?.slice(0, 15)}
      </button>
      {/* profile end */}

      <div className="mt-6 mb-3 w-full h-[0.5px] bg-white"></div>

      {/* form start */}
      <form action="">
        <h2 className=" font-roboto font-medium text-white text-center">
          Enter Your Task
        </h2>

        <div className="relative mt-3">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            id="floating_helper"
            aria-describedby="floating_helper_text"
            className="block rounded-md px-2.5 pb-2.5 pt-5 w-full font-roboto font-medium text-xl text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
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
          className="mt-5 w-full p-2 font-roboto font-semibold text-xl text-primary bg-white rounded-md border-2 border-white duration-100 hover:bg-primary hover:text-white"
        >
          Add Task
        </button>
      </form>
      {/* form end */}

      <div className=" bg-primary mt-5">
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>

      {/* setting button */}
      <button
        onClick={() => setSetting(true)}
        className=" hidden font-roboto font-semibold text-2xl flex items-center justify-center gap-2 text-center text-gray-300 w-full py-3 absolute left-0 bottom-0"
      >
        <IoMdSettings /> Settings Preference
      </button>

      {/* footer start */}
      <div className=" my-5 w-full">
        <p className=" font-roboto font-medium text-gray-300 text-center ">
          &copy; {new Date().getFullYear()}{" "}
          <a
            target="_blank"
            className=" hover:text-white"
            href="https://rameem.netlify.app/"
          >
            MH Rameem
          </a>{" "}
          from{" "}
          <a
            target="_blank"
            className=" hover:text-white"
            href="https://republic-of-legends.netlify.app/"
          >
            Republic of Legends
          </a>
        </p>

        <p
          onClick={() => setAbout(true)}
          className=" font-roboto font-medium text-white text-center cursor-pointer"
        >
          Privacy Policy
        </p>
      </div>
      {/* footer end */}

      {/* show about start */}
      {about && <About setAbout={setAbout} />}
      {/* show about end */}
    </div>
  );
};

export default Sidebar;
