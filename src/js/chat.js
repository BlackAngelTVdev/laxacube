
function toggleChat() {
    const chat = document.getElementById('chat-container');
    if (chat.style.display === "flex") {
        chat.style.display = "none";
    } else {
        chat.style.display = "flex";
    }
}