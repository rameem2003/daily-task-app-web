import React, { createContext, useContext, useEffect, useState } from "react";

import { database } from "../Firebase";
import { ref, onValue } from "firebase/database";
import { Authcontext } from "./AuthContextProvider";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const { currentUser } = useContext(Authcontext);
  const [todos, setTodos] = useState([]);
  console.log(currentUser);

  useEffect(() => {
    let userID = currentUser.uid;
    const starCountRef = ref(
      database,
      "todos/" + "GXfTByGG7WdlRQHZLr2JPHbrAxh1"
    );
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });

      setTodos(arr);
    });
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
