import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

// React Toast Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// vite give us access to the env variables using "import.meta.env" object

// As reading environment variables at run time is not an option for the frontend, we must fallback to compile time substitution.

// Once again it is very important to keep in mind that what actually happens is essentially textual substitution of environment variables in build time for every FE env variables

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key!");
}

// DISABLE REACT DEV TOOLS FOR PRODUCTION
if (import.meta.env.MODE === "production") {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />
    </ClerkProvider>
  </React.StrictMode>
);
