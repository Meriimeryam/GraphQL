import { handleLogout } from "../auth/logout.js";
import { graphqlRequest } from "../graphql/client.js";
import { RESULT_QUERY, USER_QUERY } from "../graphql/queries.js";

export function renderProfile() {
    return `
        <main>
            <nav>
                <div id="title">
                    <h1>GraphQL</h1>
                    <p>Welcome to the GraphQL world!</p>
                </div>
                <button id="logout" onclick="handleLogout()">Logout</button>
            </nav>

            <div id="user-info"></div>
            <div id="graphs">
                <div id="graph-1"></div>
                <div id="graph-2"></div>
            </div>
        </main>
    `
}


export async function loadProfile() {
    try {
        const data = await graphqlRequest(RESULT_QUERY);

        console.log("GraphQL data:", data);

    } catch (error) {
        console.error("Failed to load profile:", error);
    }
}