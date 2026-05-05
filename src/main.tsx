import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";

const redirect = sessionStorage.getItem("spa_redirect");
if (redirect) {
  sessionStorage.removeItem("spa_redirect");
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
