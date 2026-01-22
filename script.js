const chat = document.getElementById('chat');
const msgInput = document.getElementById('msg');

function send() {
  const message = msgInput.value.trim();
  if (message === '') return;

  // Show user message
  const userMsg = document.createElement('div');
  userMsg.textContent = 'You: ' + message;
  userMsg.style.color = '#00ffff';
  chat.appendChild(userMsg);

  // Clear input
  msgInput.value = '';

  // Fake AI reply for now
  setTimeout(() => {
    const aiMsg = document.createElement('div');
    aiMsg.textContent = 'Quantum AI: Let me think...';
    aiMsg.style.color = '#fff';
    chat.appendChild(aiMsg);
    chat.scrollTop = chat.scrollHeight;
  }, 500);
}
