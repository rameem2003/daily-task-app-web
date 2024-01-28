import React, { useState } from "react";
import image from "../assets/Image.png";
import { auth, database } from "../Firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { IoLogoApple } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [email, setEmaii] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

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
      setAuthLoading(true);
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
          setAuthLoading(false);
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
          onSubmit={handleLogin}
          action=""
          className=" w-[393px] shadow-xl px-[51px] py-7  rounded-[8px]"
        >
          <h1 className=" font-roboto font-medium text-center text-[20px] text-primary">
            Welcome To Daily Task
          </h1>

          <p className=" font-roboto font-normal text-center text-[12px] text-secondary mt-[18px]">
            Note your daily task
          </p>

          <button className=" w-[70%] h-[50px] mx-auto my-3 hidden items-center justify-center gap-3 border-[1.5px] border-gray-200 rounded-md">
            <FcGoogle size={35} className=" cursor-pointer" />

            <h3 className=" font-roboto font-medium text-[15px]">
              Login with google
            </h3>
          </button>

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
            {authLoading ? (
              <div className=" flex items-center justify-center">
                <ThreeDots
                  visible={true}
                  height="auto"
                  width="50px"
                  color="#ffffff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              "Connect"
            )}
          </button>

          <p className="font-roboto font-normal text-center text-[12px] text-secondary mt-7">
            You haven't any account ?{" "}
            <Link className=" text-primary" to="/register">
              Create an account
            </Link>
          </p>

          <div className=" mt-7 relative hidden">
            <span className=" font-roboto font-normal text-[12px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white px-3">
              OR
            </span>
            <div className="w-full h-[1px] bg-secondary"></div>
          </div>

          <div className="my-9 hidden items-center justify-center gap-3">
            <FcGoogle size={35} className=" cursor-pointer" />
            <BiLogoFacebookCircle
              size={35}
              className=" text-blue-600 cursor-pointer"
            />
            <IoLogoApple size={35} className=" cursor-pointer" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
