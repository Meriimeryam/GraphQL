import { bindLoginEvents, renderLogin } from "./auth/login.js";

const app = document.getElementById("app");

app.innerHTML = renderLogin();
bindLoginEvents();