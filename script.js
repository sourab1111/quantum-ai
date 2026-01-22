const chat = document.getElementById('chat');
const msgInput = document.getElementById('msg');

async function send() {
  const message = msgInput.value.trim();
  if (message === '') return;

  // Show user message
  const userMsg = document.createElement('div');
  userMsg.textContent = 'You: ' + message;
  userMsg.style.color = '#00ffff';
  chat.appendChild(userMsg);

  // Clear input
  msgInput.value = '';

  // Show "thinking..."
  const thinking = document.createElement('div');
  thinking.textContent = 'Quantum AI: Thinking...';
  thinking.style.color = '#fff';
  chat.appendChild(thinking);
  chat.scrollTop = chat.scrollHeight;

  try {
    // Call Gemini API
    const response = await fetch('https://api.gemini.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer AIzaSyCjUNQEJeWbYV83SRBQhx9p7DwdUDo6dyk
      },
      body: JSON.stringify({
        model: 'gpt-4', // you can use the model you have access to
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();

    // Replace thinking with real AI reply
    thinking.textContent = 'Quantum AI: ' + data.choices[0].message.content;

  } catch (err) {
    thinking.textContent = 'Quantum AI: Sorry, something went wrong.';
    console.error(err);
  }

  chat.scrollTop = chat.scrollHeight;
}
