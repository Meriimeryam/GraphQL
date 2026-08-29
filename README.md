# GraphQL Profile Dashboard

A vanilla JavaScript web app that authenticates with the Zone01 API, fetches user data through GraphQL, and displays profile information with SVG-based charts.

## Live Demo

[graphql-01-zone.netlify.app](https://graphql-01-zone.netlify.app)

## Features

- Login with Zone01 credentials
- Fetch profile, XP, level, skills, and audit data from the GraphQL API
- Display user profile details and avatar
- Visualize XP by project
- Visualize skills
- Visualize audit ratio
- Logout and token-based session handling


## Project Structure

```text
.
├── index.html
├── js
│   ├── auth
│   │     ├── login.js
│   │     ├── logout.js
│   │     └── token.js
│   ├── charts
│   │     ├── ratio_chart.js
│   │     ├── skill_chart.js
│   │     └── xp_chart.js
│   ├── graphql
│   │     ├── client.js
│   │     └── queries.js
│   ├── profile
│   │     └── profile.js
│   ├── helpers.js
│   ├── main.js
│   ├── ui.js
│   └── user_data.js
└── static
    ├── css
    └── resources
```

## Getting Started

Clone the project and open `index.html` in a browser.

```bash
git clone <repository-url>
cd GraphQL
```

Then open the `index.html` file in the browser

## API

The app uses:

- Auth endpoint: `https://learn.zone01oujda.ma/api/auth/signin`
- GraphQL endpoint: `https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql`

## Usage

1. Open the app.
2. Log in with your Zone01 email or username and password.
3. View your profile, XP, skills, and audit ratio charts.
4. Use the logout button to end the session.
