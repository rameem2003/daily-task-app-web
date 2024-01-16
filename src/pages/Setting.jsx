import React, { useContext } from "react";
import { SettingContext } from "../context/SettingContextProvider";
import { FaTimes } from "react-icons/fa";
import { Authcontext } from "../context/AuthContextProvider";

const Setting = () => {
  const { setSetting } = useContext(SettingContext);
  const { currentUser } = useContext(Authcontext);
  return (
    <div className=" fixed top-0 left-0 bg-white/30 backdrop-blur-[0.5] w-full h-screen flex items-center justify-center">
      <div className=" w-[600px] h-[700px] bg-white rounded-md shadow-lg p-4">
        <div className=" flex items-center justify-between">
          <h1 className=" font-roboto font-medium text-2xl">
            Settings Preference
          </h1>

          <FaTimes
            onClick={() => setSetting(false)}
            size={30}
            className=" cursor-pointer"
          />
        </div>

        <h1 className=" font-roboto font-semibold text-2xl my-3">
          {currentUser.displayName}
        </h1>

        <h1>Coming Soon</h1>
      </div>
    </div>
  );
};

export default Setting;
