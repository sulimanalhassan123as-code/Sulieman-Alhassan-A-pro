document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const thinkingIndicator = document.getElementById('thinking-indicator');

    const displayMessage = (message, sender) => {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message', `${sender}-message`);

        if (sender === 'ai') {
            const avatar = document.createElement('span');
            avatar.classList.add('ai-avatar');
            avatar.textContent = '🌟';
            messageContainer.appendChild(avatar);
        }

        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble');
        messageBubble.textContent = message;
        messageContainer.appendChild(messageBubble);

        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    const getAiResponse = async (prompt) => {
        thinkingIndicator.style.display = 'block';
        userInput.disabled = true;
        sendBtn.disabled = true;

        try {
            // This fetch call goes to YOUR secure Vercel function, not directly to Google
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            displayMessage(data.reply, 'ai');

        } catch (error) {
            console.error('Fetch Error:', error);
            displayMessage('Sorry, an error occurred. Please check the connection and try again.', 'ai');
        } finally {
            thinkingIndicator.style.display = 'none';
            userInput.disabled = false;
            sendBtn.disabled = false;
            userInput.focus();
            
            setTimeout(() => {
                displayMessage("SULIEMAN say's I should ask you do you understand.", 'ai');
            }, 1500);
        }
    };

    const handleUserInput = () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            userInput.value = '';
            getAiResponse(userMessage);
        }
    };

    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    // Initial greeting from the AI
    setTimeout(() => {
        displayMessage("Hello! I am NEVER HIDE AI PRO. How can I assist you today?", 'ai');
    }, 1000);
});
