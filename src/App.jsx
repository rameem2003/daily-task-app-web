import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Authcontext } from "./context/AuthContextProvider";

function App() {
  const { currentUser } = useContext(Authcontext);

  const ProtectorRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectorRoute>
                  <Home />
                </ProtectorRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
