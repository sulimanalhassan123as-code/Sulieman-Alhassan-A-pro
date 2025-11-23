document.addEventListener('DOMContentLoaded', () => {
    // --- CRITICAL FIX FOR MOBILE KEYBOARD ---
    // This function ensures the app resizes correctly when the mobile keyboard appears.
    const setAppHeight = () => {
        const doc = document.documentElement;
        // We set a CSS variable '--app-height' to the real inner height of the window.
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', setAppHeight);
    setAppHeight(); // Set the height on initial load
    // --- END: CRITICAL FIX FOR MOBILE KEYBOARD ---

    // Get all the necessary elements from the HTML
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const thinkingIndicator = document.getElementById('thinking-indicator'); // This will now work!

    // Function to display any message (from user or AI) in the chat box
    const displayMessage = (message, sender) => {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message', `${sender}-message`);

        const messageContent = document.createElement('div'); // A wrapper for avatar and bubble
        
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
        chatBox.scrollTop = chatBox.scrollHeight; // Automatically scroll to the latest message
    };

    // Function to call your secure backend and get the AI's response
    const getAiResponse = async (prompt) => {
        thinkingIndicator.style.display = 'flex'; // Use flex to center the dots
        userInput.disabled = true;
        sendBtn.disabled = true;

        try {
            // Send the user's message to your secure /api/gemini function
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt }),
            });

            // If the server response is not "OK", throw an error to be caught below
            if (!response.ok) {
                throw new Error(`Server error: The backend responded with status ${response.status}`);
            }

            const data = await response.json();

            // If the backend sent a specific error message
            if (data.error) {
                throw new Error(`Backend error: ${data.error.message}`);
            }

            displayMessage(data.reply, 'ai');

        } catch (error) {
            console.error("An Error Occurred:", error);
            // Display a user-friendly error message in the chat
            displayMessage(`Sorry, something went wrong. Error: ${error.message}`, 'ai');
        } finally {
            // This code runs whether there was an error or not
            thinkingIndicator.style.display = 'none';
            userInput.disabled = false;
            sendBtn.disabled = false;
            userInput.focus(); // Put the cursor back in the input box
        }
    };

    // Function that runs when the user clicks Send or presses Enter
    const handleUserInput = () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            userInput.value = '';
            getAiResponse(userMessage);
        }
    };

    // Set up the event listeners
    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    // A nice welcome message
    setTimeout(() => {
        displayMessage("Hello! I am NEVER HIDE AI PRO. How can I assist you today?", 'ai');
    }, 1000);
});
