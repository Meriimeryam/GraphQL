import { bindLoginEvents, renderLogin } from "./auth/login.js";
import { getToken } from "./auth/token.js";
import { bindProfileEvents, renderProfile, loadProfile } from "./profile/profile.js";
import { render } from "./ui.js";


async function init() {
    const token = getToken();

    if (token) {
        render(renderProfile,bindProfileEvents);
        await loadProfile(false);
        return;
    }
    render(renderLogin, bindLoginEvents);
}

init();