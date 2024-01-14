import React, { useState } from "react";
import image from "../assets/Image.png";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmaii] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError(true);
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (email && password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
          toast.success("Login Success", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorCode);
          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("Invalid Email & Password", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
    }
  };

  return (
    <div className=" w-full h-screen flex items-center">
      <ToastContainer />
      <div className=" w-5/12 h-screen">
        <img className="w-full h-screen object-cover" src={image} alt="" />
      </div>

      <div className=" w-7/12 flex items-center justify-center">
        <form
          action=""
          className=" w-[393px] shadow-xl px-[51px] py-7  rounded-[8px]"
        >
          <h1 className=" font-roboto font-medium text-center text-[20px] text-primary">
            Welcome To Daily Task
          </h1>

          <p className=" font-roboto font-normal text-center text-[12px] text-secondary mt-[18px]">
            Note your daily task
          </p>

          <div className="mt-7">
            <label
              htmlFor=""
              className="font-roboto font-normal text-[12px] text-secondary mb-3 block"
            >
              Email
            </label>

            <input
              id="email"
              onChange={(e) => {
                setEmaii(e.target.value);
                setEmailError(false);
              }}
              value={email}
              className=" font-roboto font-medium text-[15px] px-3 w-full h-8 rounded-[10px] bg-[#f4f4f4] "
              type="email"
              name=""
            />

            {emailError && (
              <p className=" font-roboto font-normal text-xs text-red-500 mt-2">
                Invalid email or email empty
              </p>
            )}
          </div>

          <div className="mt-7 relative">
            <label
              htmlFor=""
              className="font-roboto font-normal text-[12px] text-secondary mb-3 block"
            >
              Password
            </label>

            <input
              id="pass"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              value={password}
              className=" font-roboto font-medium text-[15px] px-3 w-full h-8 rounded-[10px] bg-[#f4f4f4] "
              type={toggle ? "text" : "password"}
              name=""
            />
            {passwordError && (
              <p className=" font-roboto font-normal text-xs text-red-500 mt-2">
                Empty password
              </p>
            )}

            {toggle ? (
              <FaRegEye
                onClick={() => setToggle(!toggle)}
                className=" absolute right-2 top-9 cursor-pointer"
                size={20}
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setToggle(!toggle)}
                className=" absolute right-2 top-9 cursor-pointer"
                size={20}
              />
            )}
          </div>

          <button
            onClick={handleLogin}
            className=" font-roboto font-medium text-[12px] text-white block mt-9 w-[150px] h-8 mx-auto bg-primary rounded-[10px]"
          >
            Connect
          </button>

          <p className="font-roboto font-normal text-center text-[12px] text-secondary mt-7">
            You haven't any account ?{" "}
            <Link className=" text-primary" to="/register">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
