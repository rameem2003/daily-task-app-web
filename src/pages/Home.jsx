import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Todopage from "../components/Todopage";
import { SettingContext } from "../context/SettingContextProvider";
import Setting from "./Setting";

const Home = () => {
  const { setting } = useContext(SettingContext);
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <Todopage />
      {setting && <Setting />}
    </div>
  );
};

export default Home;
