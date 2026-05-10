// Traveloop AI Assistant (Gemini API)
// Include this script at the bottom of your HTML pages.

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // Replace with your actual Gemini API Key

const botStyles = `
#chatbot-fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--azure-blue, #1A6EF5), var(--sky-blue, #4FA3F7));
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(26, 110, 245, 0.4);
    z-index: 9999;
    transition: all 0.3s ease;
}
#chatbot-fab:hover {
    transform: scale(1.1) translateY(-5px);
    box-shadow: 0 6px 20px rgba(26, 110, 245, 0.6);
}
#chatbot-window {
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 350px;
    height: 500px;
    background: var(--ocean-deep, #071C3F);
    border: 1px solid rgba(139, 167, 212, 0.2);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    z-index: 9998;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateY(20px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}
#chatbot-window.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
}
#chatbot-header {
    background: linear-gradient(135deg, var(--azure-blue, #1A6EF5), var(--sky-blue, #4FA3F7));
    padding: 15px 20px;
    color: white;
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#chatbot-close {
    cursor: pointer;
    font-size: 1.5rem;
    line-height: 1;
}
#chatbot-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.chat-msg {
    max-width: 80%;
    padding: 12px 16px;
    border-radius: 15px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    line-height: 1.5;
}
.chat-msg.bot {
    background: rgba(139, 167, 212, 0.1);
    color: var(--mist-white, #E8F0FE);
    align-self: flex-start;
    border-bottom-left-radius: 2px;
}
.chat-msg.user {
    background: rgba(245, 200, 66, 0.15);
    color: var(--journey-gold, #F5C842);
    border: 1px solid rgba(245, 200, 66, 0.3);
    align-self: flex-end;
    border-bottom-right-radius: 2px;
}
#chatbot-input-area {
    padding: 15px;
    border-top: 1px solid rgba(139, 167, 212, 0.1);
    display: flex;
    gap: 10px;
    background: rgba(0,0,0,0.2);
}
#chatbot-input {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(139, 167, 212, 0.3);
    border-radius: 20px;
    padding: 10px 15px;
    color: white;
    font-family: 'DM Sans', sans-serif;
    outline: none;
}
#chatbot-send {
    background: var(--journey-gold, #F5C842);
    color: var(--ocean-deep, #071C3F);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    transition: transform 0.2s;
}
#chatbot-send:hover {
    transform: scale(1.1);
}
.typing-indicator {
    display: flex;
    gap: 5px;
    padding: 5px 0;
}
.typing-indicator span {
    width: 6px;
    height: 6px;
    background: var(--sky-blue, #4FA3F7);
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
}
.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
@keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
}
`;

document.addEventListener('DOMContentLoaded', () => {
    // Inject Styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = botStyles;
    document.head.appendChild(styleSheet);

    // Inject HTML
    const botContainer = document.createElement('div');
    botContainer.innerHTML = `
        <div id="chatbot-window">
            <div id="chatbot-header">
                <span>AI Travel Assistant</span>
                <span id="chatbot-close">×</span>
            </div>
            <div id="chatbot-messages">
                <div class="chat-msg bot">Hi there! 👋 I'm your Traveloop AI assistant. How can I help you plan your next adventure today?</div>
            </div>
            <div id="chatbot-input-area">
                <input type="text" id="chatbot-input" placeholder="Ask for suggestions...">
                <button id="chatbot-send">➤</button>
            </div>
        </div>
        <div id="chatbot-fab">✨</div>
    `;
    document.body.appendChild(botContainer);

    // Logic Elements
    const fab = document.getElementById('chatbot-fab');
    const win = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const inputField = document.getElementById('chatbot-input');
    const messagesArea = document.getElementById('chatbot-messages');

    // Toggles
    fab.addEventListener('click', () => win.classList.add('open'));
    closeBtn.addEventListener('click', () => win.classList.remove('open'));

    // Send Message
    const sendMessage = async () => {
        const text = inputField.value.trim();
        if (!text) return;

        // Display user msg
        appendMessage('user', text);
        inputField.value = '';

        if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
            appendMessage('bot', "⚠️ Please add your Gemini API Key in chatbot.js to enable AI responses.");
            return;
        }

        // Show typing indicator
        const typingId = showTyping();

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: text }] }]
                })
            });
            const data = await response.json();
            removeTyping(typingId);
            
            if (data.candidates && data.candidates[0]) {
                const botReply = data.candidates[0].content.parts[0].text;
                appendMessage('bot', formatText(botReply));
            } else {
                appendMessage('bot', "I couldn't process that. Try again!");
            }
        } catch (err) {
            removeTyping(typingId);
            appendMessage('bot', "Connection error. Please try again.");
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Helpers
    function appendMessage(sender, htmlContent) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.innerHTML = htmlContent;
        messagesArea.appendChild(msgDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    function showTyping() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.id = id;
        msgDiv.className = `chat-msg bot`;
        msgDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
        messagesArea.appendChild(msgDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
        return id;
    }

    function removeTyping(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function formatText(text) {
        // Basic bold markdown to HTML for better readability
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    }
});
