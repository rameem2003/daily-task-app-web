import React, { useContext } from "react";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { Authcontext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(Authcontext);

  const handleSignout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <h1 className=" text-4xl">
        {currentUser.email} {currentUser.uid}
      </h1>
      <button onClick={handleSignout}>SignOut</button>
    </div>
  );
};

export default Home;
