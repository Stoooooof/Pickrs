import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";

const params = new URLSearchParams(window.location.search);
const redirect = params.get("p");

if (redirect) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const suffix = redirect.startsWith("/") ? redirect : "/" + redirect;
  window.history.replaceState(null, "", base + suffix);
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
