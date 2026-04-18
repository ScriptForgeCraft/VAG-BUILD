import "./shared/styles/index.css";
import { initApp } from "./app/init-app.js";
import { renderApp } from "./app/render-app.js";

const root = document.getElementById("app");

if (root) {
  renderApp(root);
  initApp();
}
