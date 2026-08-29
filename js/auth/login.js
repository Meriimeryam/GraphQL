import { bindProfileEvents, loadProfile, renderProfile } from "../profile/profile.js";
import { saveToken } from "./token.js";
import { showToast,render,showError } from "../ui.js";

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
        <svg
    class="login-illustration"
    viewBox="0 0 500 280"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    >
        <defs>
            <linearGradient id="red-glow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#E02020" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#E02020" stop-opacity="0"/>
            </linearGradient>

            <filter id="soft-glow">
                <feGaussianBlur stdDeviation="4"/>
            </filter>
        </defs>

        <!-- Background glow -->
        <circle
            cx="250"
            cy="140"
            r="100"
            fill="#E02020"
            opacity="0.08"
            filter="url(#soft-glow)"
        />

        <!-- Connections -->
        <g
            class="graph-lines"
            fill="none"
            stroke="#41413D"
            stroke-width="1.5"
        >
            <path d="M100 80 L210 130"/>
            <path d="M210 130 L300 70"/>
            <path d="M210 130 L290 210"/>
            <path d="M300 70 L410 110"/>
            <path d="M290 210 L400 190"/>
            <path d="M100 80 L120 200"/>
            <path d="M120 200 L290 210"/>
        </g>

        <!-- Red highlighted connections -->
        <g
            class="graph-lines-red"
            fill="none"
            stroke="#E02020"
            stroke-width="2"
            stroke-linecap="round"
        >
            <path d="M210 130 L300 70"/>
            <path d="M210 130 L290 210"/>
        </g>

        <!-- Nodes -->
        <g>
            <circle cx="100" cy="80" r="5" fill="#B8B8B2"/>
            <circle cx="120" cy="200" r="5" fill="#B8B8B2"/>

            <circle cx="210" cy="130" r="9" fill="#E02020"/>

            <circle cx="300" cy="70" r="6" fill="#E02020"/>
            <circle cx="290" cy="210" r="6" fill="#E02020"/>

            <circle cx="410" cy="110" r="5" fill="#B8B8B2"/>
            <circle cx="400" cy="190" r="5" fill="#B8B8B2"/>
        </g>

        <!-- Central ring -->
        <circle
            cx="210"
            cy="130"
            r="18"
            fill="none"
            stroke="#E02020"
            stroke-width="1"
            opacity="0.5"
        />

        <!-- Decorative corner lines -->
        <g
            fill="none"
            stroke="#41413D"
            stroke-width="1"
            opacity="0.7"
        >
            <path d="M40 40 H90"/>
            <path d="M40 40 V70"/>

            <path d="M460 240 H410"/>
            <path d="M460 240 V210"/>
        </g>
    </svg>
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
    // console.log("event =========> ",event);

    const errContainor = document.getElementById("login-errors");

    const identifier = document.getElementById("identifier").value.trim();
    const password = document.getElementById("password").value;

    const credentials = `${identifier}:${password}`;

    const bytes = new TextEncoder().encode(credentials);

    const encodedCredentials = btoa(String.fromCharCode(...bytes));
    
    
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
        await loadProfile(true);
        

    } catch (err) {
        console.error(err);
        
        showToast(err,"error")
    }



}



