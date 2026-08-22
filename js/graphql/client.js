import { getToken } from "../auth/token.js";

const GraphQL_URL = `https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql`;

export async function graphqlRequest(query,variables={}) {
    const token = getToken();
    if (!token) {
        throw new Error("No authentication token");
        
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
        throw new Error(`Http error: ${response.status}`);
    }

    const result = await response.json();
    if (result.errors) {
        throw new Error(result.errors[0].message);
    }

    console.log("result: ",result.data);
    

    return result.data;
}