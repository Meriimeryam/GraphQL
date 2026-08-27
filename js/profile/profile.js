import { handleLogout } from "../auth/logout.js";
import { graphqlRequest } from "../graphql/client.js";
import {drawSkillChart} from "../charts/skill_chart.js"
import { QUERY, USER_QUERY } from "../graphql/queries.js";
import { populateData } from "../user_data.js";
import { drawXpChart } from "../charts/xp_chart.js";
import { drawRatioChart } from "../charts/ratio_chart.js";

export function renderProfile() {
    return `
        <main>
            <nav>
                <div id="title">
                    <h1>GraphQL</h1>
                    <p>Welcome to the GraphQL world!</p>
                </div>
                <button id="logout">Logout</button>
            </nav>

            <div id="user-info"></div>
            <div id="graphs">
                <div id="graph-1">
                    <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                    <div id="graph-tooltip" hidden></div>
                </div>
                <div id="graph-2">
                    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                </div>
                <div id="graph-3">
                    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                </div>
            </div>
        </main>
    `
}

export function bindProfileEvents() {
    const logoutBtn = document.getElementById("logout");
    logoutBtn.addEventListener("click",handleLogout);
}


export async function loadProfile() {
    try {
        const data = await graphqlRequest(QUERY);

        console.log("GraphQL data:", data);
        const userData = populateData(data.user[0]);
        console.log(userData);
        drawSkillChart(userData.skills);
        drawXpChart(userData.xp.xpPerProject);
        drawRatioChart(userData.audits);
        

    } catch (error) {
        console.error("Failed to load profile:", error);
    }
}

function renderProfileInfo(profile,xpTotal) {
    const container = document.getElementById("user-info");
    const gender = profile.gender;
    let image;

    if (profile.avatar===null) {
        if (gender==="Female") {
            image="../static/resources/nezuko.jpeg"
        } else if (gender==="Male"){
            image="../static/resources/tomyoka.jpeg"
        } else {
            image = "../static/resources/luffy.jpeg"
        }
    } else {
        image = profile.avatar;
    }

    const firstName = profile.firstName ?? "Guest";
    const lastName = profile.lastName ?? "";
    const level = profile.level ?? "You do not have a rank yet";
    const xp = xpTotal ?? "0";

    container.innerHTML = `
        
    `
    
    
}

function rationComment(ratio,gender) {
    switch (true) {
        case ratio<=0.5:
            return "You are in danger!";
        case ratio > 0.5 && ratio < 1:
            return "You need to work harder";
        case ratio >= 1 && ratio < 2:
            return "Leveling Up ⚡";
        case ratio >= 2 && ratio < 3:
            if (gender === "Female") return "You go girl 🖤";
            if (gender === "Male") return "You are the boss 🔥";
            return "Perfect ratio!";

        default:
            return "Legendary Status! 👑";
    }
}