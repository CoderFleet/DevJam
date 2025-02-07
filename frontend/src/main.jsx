import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ModalProvider from "../context/ModalContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <UserProvider> */}
      <ModalProvider>
        <App />
      </ModalProvider>
    {/* </UserProvider> */}
  </BrowserRouter>
);
