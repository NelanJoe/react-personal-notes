import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Context Provider
import DarkModeContextProvider from "./contexts/dark-mode-context.jsx";
import LocaleContextProvider from "./contexts/locale-context.jsx";

// Styles css
import "./styles/index.css";

// Fonts
import "@fontsource-variable/plus-jakarta-sans";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

// QueryClient

const queryClient = new QueryClient();

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);
root.render(
  <DarkModeContextProvider>
    <LocaleContextProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Toaster position="top-right" />
      </BrowserRouter>
    </LocaleContextProvider>
  </DarkModeContextProvider>
);
