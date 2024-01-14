// Databse Coming From rameem2019@gmail.com
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDRVLMVEGcgiGmtmi7g1qdVo_ZyaxJm40I",
  authDomain: "daily-task-app-4b785.firebaseapp.com",
  databaseURL: "https://daily-task-app-4b785-default-rtdb.firebaseio.com",
  projectId: "daily-task-app-4b785",
  storageBucket: "daily-task-app-4b785.appspot.com",
  messagingSenderId: "1094527599398",
  appId: "1:1094527599398:web:59afe7a872b8cc2b2cb7e7",
};

// Initialize Firebase
export const config = initializeApp(firebaseConfig);
export const auth = getAuth(config);
export const database = getDatabase();
