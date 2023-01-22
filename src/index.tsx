import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import { createContext } from "react";
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = setupStore();

export const Context = createContext<any | null>(null);

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const storage = getStorage(app);

root.render(
  <Provider store={store}>
    <Context.Provider value={{ db }}>
      <App />
    </Context.Provider>
  </Provider>
);
