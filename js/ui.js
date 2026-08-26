const app = document.getElementById("app");

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
    toast.classList.add(type);
    toast.innerText = message;

    app.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

export function render(renderView,bindEvents) {
    app.innerHTML = renderView();
    
    if (bindEvents) {
        bindEvents();
    }
}