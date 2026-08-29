import { handleLogout} from "../auth/logout.js";
import { getToken } from "../auth/token.js";
import { showToast } from "../ui.js";
// import { render } from "../ui.js";

const GraphQL_URL = `https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql`;

export async function graphqlRequest(query,variables={}) {
    const token = getToken();

    if (!token) {
        handleLogout();
    }

    const response = await fetch(GraphQL_URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    if (!response.ok) {
        
        showToast("Unable to load data","error");
    }

    const result = await response.json();
    if (result.errors) {
        
        if (result.errors[0].extensions?.code=== "invalid-jwt") {
            handleLogout();
            return;
        }
        showToast("Server Error", "error");
        
    }


    return result.data;
}