import { loadProfile, renderProfile } from "../profile/profile.js";
import { saveToken } from "./token.js";
import { showToast } from "../ui.js";

export function renderLogin() {
    return `
        <div id="login-view">
            <h1>Login</h1>
            <form id="login-form">
                <label for="identifier">Email or username:</label>
                <input type="text" id="identifier" name="identifier" placeholder="jsmith" required>
                <br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="intra password" required>
                <br>
                <button type="submit">Login</button>
            </form>
            <div id="login-errors" hidden></div>
        </div>
    `
}

export function bindLoginEvents() {
    const form = document.getElementById("login-form");

    if (!form) {
        return;
    }
    
    form.addEventListener("submit", handleLogin);
}

export async function handleLogin(event) {
    event.preventDefault();
    console.log("event =========> ",event);

    const errContainor = document.getElementById("login-errors");

    const identifier = document.getElementById("identifier").value.trim();
    const password = document.getElementById("password").value;

    const encodedCredentials = btoa(`${identifier}:${password}`);
    
    
    try {
        const response = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${encodedCredentials}`
            }
        });
        
        if (!response.ok) {
            if (response.status=== 403) {
                showError("user Does not exist or passeword incorrect", errContainor);
                return;
            }
            
            showToast("Server error", "error");
            return;
        }
        const jwt = await response.json();
        

        saveToken(jwt);
        await loadProfile();
        render(renderProfile, bindProfileEvents);
        

    } catch (err) {
        showToast(err,"error")
    }



}

