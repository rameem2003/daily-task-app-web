import React, { useContext, useState } from "react";
import { auth, database } from "../Firebase";
import { updateProfile } from "firebase/auth";
import { ref, update } from "firebase/database";
import {
  getStorage,
  ref as myStorageref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Authcontext } from "../context/AuthContextProvider";
import { SettingContext } from "../context/SettingContextProvider";
import { FaTimes } from "react-icons/fa";

const Setting = () => {
  const { setSetting } = useContext(SettingContext);
  const { currentUser } = useContext(Authcontext);
  const [updateName, setUpdateName] = useState("");
  const [file, setFile] = useState({});

  const updateUserProfile = async (e) => {
    e.preventDefault();
    if (!file && updateName) {
      await updateProfile(currentUser, {
        displayName: updateName,
      })
        .then(() => {
          // Profile updated!
          // ...

          update(ref(database, "users/" + currentUser.uid), {
            fullname: currentUser.displayName,
          });
        })
        .then(() => {
          setSetting(false);
        })
        .catch((error) => {
          // An error occurred
          // ...
          console.log(error.code);
        });
    }
    if (file && !updateName) {
      const storage = getStorage();
      const storageRef = myStorageref(
        storage,
        `images/${new Date().toLocaleDateString()}`
      );

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await updateProfile(currentUser, {
              photoURL: downloadURL,
            })
              .then(() => {
                // Profile updated!
                // ...

                update(ref(database, "users/" + currentUser.uid), {
                  photo: downloadURL,
                });
              })
              .then(() => {
                setSetting(false);
              })
              .catch((error) => {
                // An error occurred
                // ...
                console.log(error.code);
              });
          });
        }
      );
    } else {
      const storage = getStorage();
      const storageRef = myStorageref(
        storage,
        `images/${new Date().toLocaleDateString()}`
      );

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await updateProfile(currentUser, {
              displayName: updateName,
              photoURL: downloadURL,
            })
              .then(() => {
                // Profile updated!
                // ...

                update(ref(database, "users/" + currentUser.uid), {
                  fullname: currentUser.displayName,
                  photo: downloadURL,
                });
              })
              .then(() => {
                setSetting(false);
              })
              .catch((error) => {
                // An error occurred
                // ...
                console.log(error.code);
              });
          });
        }
      );
    }
  };
  return (
    <div className=" fixed top-0 left-0 bg-white/30 backdrop-blur-[0.5] w-full h-screen flex items-center justify-center">
      <div className=" w-[600px] h-[90%] bg-white rounded-md shadow-lg p-4">
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

        <div>
          <img
            className="h-[150px] w-[150px] mx-auto"
            src={currentUser.photoURL}
            alt=""
          />
        </div>
        <h1 className=" font-roboto font-semibold text-center text-2xl my-3">
          {currentUser.displayName}
        </h1>

        <form action="">
          <div className="relative mt-3">
            <input
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
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
              Update Your Name
            </label>
          </div>

          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="multiple_files"
          >
            Upload multiple files
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            class="block w-full text-xl text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50  focus:outline-primary "
            id="multiple_files"
            type="file"
            multiple
          />

          <button
            onClick={updateUserProfile}
            className="mt-5 w-full p-2 font-roboto font-semibold text-xl bg-primary text-white rounded-md border-2 border-white duration-100 hover:bg-white hover:text-primary hover:border-primary"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
