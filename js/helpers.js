export function xpConvert(xp) {
    if (xp<1000) {
        return xp;
    } else if (xp >= 1000 && xp < 1000000) {
        return (xp/1000).toFixed(2)+"KB"
    } else if (xp >= 1000000) {
        return (xp/1000000).toFixed(2)+"MB"
    }
}

export function formatDate(date) {
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })
}