document.addEventListener('DOMContentLoaded', () => {
    // --- START: CRITICAL FIX FOR MOBILE KEYBOARD ---
    // This function calculates the actual viewport height, avoiding issues when the keyboard appears.
    const setAppHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', setAppHeight);
    setAppHeight(); // Set the height on initial load
    // --- END: CRITICAL FIX FOR MOBILE KEYBOARD ---

    console.log("NEVER HIDE AI PRO: Script loaded successfully.");

    // Get all the necessary elements from the HTML
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const thinkingIndicator = document.getElementById('thinking-indicator');

    // Function to display any message (from user or AI) in the chat box
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
        chatBox.scrollTop = chatBox.scrollHeight; // Automatically scroll to the latest message
    };

    // Function to call your secure backend and get the AI's response
    const getAiResponse = async (prompt) => {
        console.log(`Sending prompt to backend: "${prompt}"`);
        thinkingIndicator.style.display = 'block';
        userInput.disabled = true;
        sendBtn.disabled = true;

        try {
            // This sends the user's message to your secure /api/gemini function on Vercel
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt }),
            });

            console.log(`Received response from backend with status: ${response.status}`);

            // If the server response is not "OK" (e.g., 404, 500), this will catch the error
            if (!response.ok) {
                throw new Error(`Server error: The backend responded with status ${response.status}`);
            }

            const data = await response.json();

            // Check if the server sent back an error message inside a successful request
            if (data.error) {
                throw new Error(`Backend error: ${data.error.message}`);
            }

            console.log("AI response data:", data);
            displayMessage(data.reply, 'ai');

        } catch (error) {
            // --- THIS IS THE MOST IMPORTANT PART FOR FINDING ERRORS ---
            console.error("!!! An Error Occurred !!!", error);
            // Display a user-friendly error message in the chat
            displayMessage(`Sorry, something went wrong. Please check the developer console (F12) for more details. Error: ${error.message}`, 'ai');
        } finally {
            // This code runs whether there was an error or not
            thinkingIndicator.style.display = 'none';
            userInput.disabled = false;
            sendBtn.disabled = false;
            userInput.focus(); // Put the cursor back in the input box
            
            // The follow-up question from SULIEMAN
            setTimeout(() => {
                displayMessage("SULIEMAN say's I should ask you do you understand.", 'ai');
            }, 1500);
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

    // Set up the event listeners for the button and the input box
    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    // --- RESTORED BEAUTIFUL WELCOME MESSAGE ---
    setTimeout(() => {
        displayMessage("Hello! I am NEVER HIDE AI PRO. How can I assist you today?", 'ai');
    }, 1000);
});
