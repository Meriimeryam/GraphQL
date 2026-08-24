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
                    <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                </div>
                <div id="graph-2">
                    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
                    </svg>
                </div>
                <div id="graph-3">
                    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
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