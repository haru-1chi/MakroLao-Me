import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
// import Tailwind from 'primereact/passthrough/tailwind';
ReactDOM.createRoot(document.getElementById("root")).render(
  // <PrimeReactProvider value={{unstyled : true,pt:Tailwind}} >
  <PrimeReactProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PrimeReactProvider>
);
