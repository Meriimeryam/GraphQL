import { removeToken } from "./token.js";
import { render } from "../ui.js"
import { bindLoginEvents, renderLogin } from "./login.js";

export function handleLogout() {
    removeToken();
    render(renderLogin,bindLoginEvents);
}