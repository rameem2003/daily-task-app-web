import React, { useContext, useEffect, useState } from "react";
import { database } from "../Firebase";
import { ref, onValue } from "firebase/database";
import { Authcontext } from "../context/AuthContextProvider";
import Loading from "./Loading";
import Todo from "./Todo";
import NoTodo from "./NoTodo";

const TodoList = () => {
  const { currentUser } = useContext(Authcontext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const starCountRef = ref(database, "todos/" + currentUser.uid);
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });

      setTodos(arr);

      setLoading(false);
    });
  }, []);

  const ShowTodos = () => {
    return (
      <>
        {todos.length == 0 ? (
          <NoTodo />
        ) : (
          todos.map((item, i) => {
            return <Todo key={i} item={item} />;
          })
        )}
      </>
    );
  };

  console.log(todos);
  return (
    <div className=" p-3 mt-3 overflow-y-scroll h-[90%]">
      {loading ? <Loading /> : <ShowTodos />}
    </div>
  );
};

export default TodoList;
