import React from "react";
import Sidebar from "../components/Sidebar";
import Todopage from "../components/Todopage";

const Home = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <Todopage />
    </div>
  );
};

export default Home;
