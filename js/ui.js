const app = document.getElementById("app");

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

    bindEvents();
}