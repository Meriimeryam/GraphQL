import { bindProfileEvents, loadProfile, renderProfile } from "../profile/profile.js";
import { saveToken } from "./token.js";
import { showToast,render } from "../ui.js";

export function renderLogin() {
    return `
        <div id="login-view">
            <h1>Login</h1>
            <form id="login-form">
                <div class="form-field">
                    <label for="identifier">Email or username:</label>
                    <input type="text" id="identifier" name="identifier" placeholder="jsmith" required>
                </div>
                <div class="form-field">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="intra password" required>
                </div>
                <div id="login-errors" hidden></div>  
                <button type="submit">Login</button>
            </form>
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
            if (response.status=== 403 || response.status=== 401) {
                showError("invalid credentials", errContainor);
                return;
            }
            
            showToast("Server error", "error");
            return;
        }
        const jwt = await response.json();
        

        saveToken(jwt);
        render(renderProfile,bindProfileEvents);
        await loadProfile();
        

    } catch (err) {
        console.error(err);
        
        showToast(err,"error")
    }



}

function showError(message,containor) {
    console.log("========= showError ==========");
    
    containor.removeAttribute("hidden");
    containor.textContent = message;
}

