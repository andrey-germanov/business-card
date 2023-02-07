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
import { MantineProvider } from "@mantine/core";
import theme from './light.theme'
import { NotificationsProvider } from "@mantine/notifications";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';



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
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </Context.Provider>
  </Provider>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
