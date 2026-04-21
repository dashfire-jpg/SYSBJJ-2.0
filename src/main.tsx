import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

/* CONTEXTOS */
import { LanguageProvider } from "./contexts/LanguageContext";
import { DataProvider } from "./contexts/DataContext";
import { ProfileProvider } from "./contexts/ProfileContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root não encontrado");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <DataProvider>
          <ProfileProvider>
            <App />
          </ProfileProvider>
        </DataProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
