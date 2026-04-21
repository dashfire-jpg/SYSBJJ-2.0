import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { LanguageProvider } from "./contexts/LanguageContext";
import { DataProvider } from "./contexts/DataContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root não encontrado");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
