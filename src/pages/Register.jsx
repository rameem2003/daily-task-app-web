import React, { useState } from "react";
import { auth, database } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import image from "../assets/Image.png";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { IoLogoApple } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [name, setName] = useState("");
  const [email, setEmaii] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name) {
      setNameError(true);
    }
    if (!email) {
      setEmailError(true);
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (email && password && name) {
      setAuthLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name,
            photoURL: "https://i.ibb.co/L9CPYL3/user-avatar.png",
          })
            .then(() => {
              console.log(user);
              // Profile updated!
              // ...

              set(ref(database, "users/" + user.uid), {
                id: user.uid,
                fullname: user.displayName,
                email: user.email,
                photo: user.photoURL,
              });

              toast.success("Registration Success", {
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
                navigate("/login");
              }, 3000);
            })
            .catch((error) => {
              // An error occurred
              // ...

              console.log(error.code);
            });
        })
        .catch((error) => {
          setAuthLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorCode);

          if (errorCode.includes("auth/weak-password")) {
            toast.error("Opps! Weak Password", {
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
          if (errorCode.includes("auth/email-already-in-use")) {
            toast.error("Email Already Used. Try Again", {
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
          // ..
        });
    }
  };

  const handleGoogleAuth = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        console.log(user);

        toast.success("Registration Success", {
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
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        console.log(errorCode);

        toast.error(errorCode, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
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
            Register Your Account
          </p>

          <div className="mt-7">
            <label
              htmlFor=""
              className="font-roboto font-normal text-[12px] text-secondary mb-3 block"
            >
              Your Full Name
            </label>

            <input
              id="name"
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
              className=" font-roboto font-medium text-[15px] px-3 w-full h-8 rounded-[10px] bg-[#f4f4f4]"
              type="text"
              name=""
            />

            {nameError && (
              <p className=" font-roboto font-normal text-xs text-red-500 mt-2">
                Name is empty
              </p>
            )}
          </div>

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
              className="font-roboto font-medium text-[15px] px-3 w-full h-8 rounded-[10px] bg-[#f4f4f4]"
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
              className=" font-roboto font-medium text-[15px] px-3 w-full h-8 rounded-[10px] bg-[#f4f4f4]"
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
            onClick={handleRegister}
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

          <div className=" mt-7 relative">
            <span className=" font-roboto font-normal text-[12px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white px-3">
              OR
            </span>
            <div className="w-full h-[1px] bg-secondary"></div>
          </div>

          <div className="my-9 flex items-center justify-center gap-3 hidden">
            <FcGoogle
              onClick={handleGoogleAuth}
              size={35}
              className=" cursor-pointer"
            />
            <BiLogoFacebookCircle
              size={35}
              className=" text-blue-600 cursor-pointer"
            />
            <IoLogoApple size={35} className=" cursor-pointer" />
          </div>

          <p className="font-roboto font-normal text-center text-[12px] text-secondary mt-7">
            Already have an account ?{" "}
            <Link className=" text-primary" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
