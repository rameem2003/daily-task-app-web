import React from "react";
import rameem from "../assets/rameem.jpg";
import fahmida from "../assets/fahmida.jpg";
import rasel from "../assets/rasel.jpg";
import {
  FaFacebook,
  FaYoutube,
  FaGithub,
  FaGlobe,
  FaTimes,
} from "react-icons/fa";

const About = ({ setAbout }) => {
  return (
    <div className=" fixed top-0 left-0 bg-white/30 backdrop-blur-[0.5] z-50 w-full h-screen flex items-center justify-center">
      <div className="w-[600px] duration-150 h-[90%] bg-white rounded-md shadow-lg p-4 overflow-y-scroll my-scrollbar">
        <div className=" relative">
          <h1 className=" font-roboto font-bold text-black text-center text-2xl mb-3">
            Privacy Policy
          </h1>

          <FaTimes
            onClick={() => setAbout(false)}
            size={25}
            className=" absolute top-1 right-3 cursor-pointer"
          />
        </div>

        <hr />

        <p className=" font-roboto font-normal text-justify mt-3">
          <span className=" font-medium">"Daily Task"</span> is a task
          management app which you can save your own daily task everyday. And we
          are ensure you that your data is absolutely safe by google
          authentication system and google database systems. And this app is
          maintained by a dedicated, hardworking developer.{" "}
          <span className=" font-medium">"Daily Task"</span> is a trademark
          product of <span className=" font-medium">Republic of Legends</span>.
          Abuse of this app , marketing by another third party vendor, asking
          money to use this app will be very offensive and{" "}
          <span className=" font-medium"> The Team Republic of Legends </span>
          can take any legal steps against this type of activities. Hope you
          enjoy this app. Any recomendation and issues pls email us at
          <span className=" font-medium"> republicoflegends2022@gmail.com</span>
          .
        </p>

        <p className=" font-medium text-right">
          {" "}
          ---- Team Republic of Legends
        </p>

        <h1 className=" font-roboto font-bold text-black text-center text-2xl my-3">
          Special Thanks To
        </h1>

        <div className=" flex justify-center flex-wrap">
          <div className=" w-1/2 flex items-center justify-center flex-col gap-3 my-3">
            <img
              className=" w-[120px] h-[120px] rounded-full"
              src={rameem}
              alt=""
            />
            <h1 className=" font-roboto font-semibold text-xl text-center">
              Mahmood Hassan Rameem
            </h1>
          </div>
          <div className=" w-1/2 flex items-center justify-center flex-col gap-3 my-3">
            <img
              className=" w-[120px] h-[120px] rounded-full"
              src={fahmida}
              alt=""
            />
            <h1 className=" font-roboto font-semibold text-xl text-center">
              Fahmida Yeasmin
            </h1>
          </div>
          <div className=" w-1/2 flex items-center justify-center flex-col gap-3 my-3">
            <img
              className=" w-[120px] h-[120px] rounded-full"
              src={rasel}
              alt=""
            />
            <h1 className=" font-roboto font-semibold text-xl text-center">
              Jahedul Islam Rasel
            </h1>
          </div>
        </div>

        <div className=" flex items-center justify-center my-9 gap-7">
          <a
            href="https://www.facebook.com/we.are.republicoflegends2022"
            target="_blank"
            className=" text-xl text-blue-500"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://www.youtube.com/@we.are.republicoflegends2022"
            target="_blank"
            className=" text-xl text-red-500"
          >
            <FaYoutube size={30} />
          </a>
          <a
            href="https://github.com/rol2022"
            target="_blank"
            className=" text-xl text-black"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://republic-of-legends.netlify.app/"
            target="_blank"
            className=" text-xl text-black"
          >
            <FaGlobe size={30} />
          </a>
        </div>

        <p className=" font-roboto font-medium text-black text-center ">
          &copy; {new Date().getFullYear()}{" "}
          <a target="_blank" href="https://rameem.netlify.app/">
            MH Rameem
          </a>{" "}
          from{" "}
          <a target="_blank" href="https://republic-of-legends.netlify.app/">
            Republic of Legends
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
