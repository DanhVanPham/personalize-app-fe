import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import { SnackbarProvider } from "notistack";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <SnackbarProvider />
          <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
