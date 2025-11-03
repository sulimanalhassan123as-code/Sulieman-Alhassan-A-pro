document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const thinkingIndicator = document.getElementById('thinking-indicator');

  const displayMessage = (message, sender) => {
    const container = document.createElement('div');
    container.classList.add('message', `${sender}-message`);

    if (sender === 'ai') {
      const avatar = document.createElement('span');
      avatar.classList.add('ai-avatar');
      avatar.textContent = '🌟';
      container.appendChild(avatar);
    }

    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.textContent = message;
    container.appendChild(bubble);
    chatBox.appendChild(container);
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  const detectApiType = (text) => {
    const keywords = ["video", "image", "picture", "generate", "create"];
    return keywords.some(k => text.toLowerCase().includes(k)) ? "memories" : "gemini";
  };

  const getAiResponse = async (prompt) => {
    const apiType = detectApiType(prompt);
    const endpoint = apiType === "memories" ? "/api/memories" : "/api/gemini";

    console.log(`Using ${apiType.toUpperCase()} API for: "${prompt}"`);

    thinkingIndicator.style.display = 'block';
    userInput.disabled = true;
    sendBtn.disabled = true;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      displayMessage(data.reply || "No response received.", 'ai');

    } catch (err) {
      console.error("Error:", err);
      displayMessage(`⚠️ Sorry, something went wrong: ${err.message}`, 'ai');
    } finally {
      thinkingIndicator.style.display = 'none';
      userInput.disabled = false;
      sendBtn.disabled = false;
      userInput.focus();
    }
  };

  const handleUserInput = () => {
    const userMsg = userInput.value.trim();
    if (!userMsg) return;
    displayMessage(userMsg, 'user');
    userInput.value = '';
    getAiResponse(userMsg);
  };

  sendBtn.addEventListener('click', handleUserInput);
  userInput.addEventListener('keypress', e => e.key === 'Enter' && handleUserInput());

  setTimeout(() => {
    displayMessage("Hello! I am NEVER HIDE AI PRO — I can chat, generate images, or even make videos. Try me!", 'ai');
  }, 800);
});
