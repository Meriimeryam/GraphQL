const app = document.getElementById("app");
const toastContainer = document.getElementById("toast-container");

export const COLORS = {
    primaryRed: "#E02020",
    brightRed: "#F03030",
    darkRed: "#8F1515",
    text: "#F0F0E8",
    secondaryText: "#B8B8B2",
    border: "#41413D",
    surface: "#292927",
    elevated: "#333330",
};

export function showToast(message, type) {
    const toast = document.createElement('div');
    toast.classList.add("toast");
    if (type) {
        toast.classList.add(type);
    }
    toast.setAttribute("role", "status");
    toast.innerText = message;

    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.add("toast-hide");
        toast.addEventListener("animationend", () => toast.remove(), { once: true });
    }, 2000);
}

export function render(renderView,bindEvents) {
    app.innerHTML = renderView();
    
    if (bindEvents) {
        bindEvents();
    }
}

export function showError(message,containor) {
    
    containor.removeAttribute("hidden");
    containor.textContent = message;
}
