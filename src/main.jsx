import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
import { EditorContextProvider } from "./context/EditorContextProvider.jsx";
import { SettingContextProvider } from "./context/SettingContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <EditorContextProvider>
      <SettingContextProvider>
        <App />
      </SettingContextProvider>
    </EditorContextProvider>
  </AuthContextProvider>
);
