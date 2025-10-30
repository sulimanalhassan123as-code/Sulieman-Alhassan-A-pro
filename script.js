// Updated script.js with debugging logs

document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded. Script is running."); // Debug 1: Check if script starts

    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const thinkingIndicator = document.getElementById('thinking-indicator');

    const displayMessage = (message, sender) => {
        // ... (This function is likely fine, no changes needed)
    };

    const getAiResponse = async (prompt) => {
        console.log("getAiResponse called with prompt:", prompt); // Debug 2: Check if this function is called

        thinkingIndicator.style.display = 'block';
        userInput.disabled = true;
        sendBtn.disabled = true;

        try {
            console.log("Attempting to fetch from /api/gemini..."); // Debug 3: Check before the network request

            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt }),
            });

            console.log("Fetch response received:", response.status, response.statusText); // Debug 4: See the HTTP status

            if (!response.ok) {
                // This will create a detailed error message if the response is not successful
                throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("AI data received:", data); // Debug 5: See the data from the server
            displayMessage(data.reply, 'ai');

        } catch (error) {
            // THIS IS THE MOST IMPORTANT PART FOR DEBUGGING
            console.error("!!! FETCH ERROR !!!:", error); // Debug 6: THIS WILL CATCH THE SILENT ERROR
            displayMessage(`An error occurred. Please check the developer console (F12) for details. Error: ${error.message}`, 'ai');
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
        console.log("Send button clicked or Enter pressed."); // Debug 7: Check if the button click works
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

    setTimeout(() => {
        displayMessage("Hello! I am NEVER HIDE AI PRO. How can I assist you today?", 'ai');
    }, 1000);
});
