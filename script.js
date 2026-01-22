const chat = document.getElementById('chat');
const msgInput = document.getElementById('msg');

// Show user message
function showUserMessage(msg) {
  const userMsg = document.createElement("div");
  userMsg.textContent = "You: " + msg;
  userMsg.style.color = "#00ffff";
  chat.appendChild(userMsg);
  chat.scrollTop = chat.scrollHeight;
}

// Show AI message
function showAIMessage(msg) {
  const aiMsg = document.createElement("div");
  aiMsg.textContent = "Quantum AI: " + msg;
  aiMsg.style.color = "#fff";
  chat.appendChild(aiMsg);
  chat.scrollTop = chat.scrollHeight;
}

// Show AI generated image
function showAIImage(url) {
  const img = document.createElement("img");
  img.src = url;
  img.style.maxWidth = "100%";
  img.style.borderRadius = "10px";
  img.style.margin = "5px 0";
  chat.appendChild(img);
  chat.scrollTop = chat.scrollHeight;
}

// Main send function
async function send() {
  const message = msgInput.value.trim();
  if (!message) return;

  showUserMessage(message);
  msgInput.value = '';

  const thinking = document.createElement("div");
  thinking.textContent = "Quantum AI: Thinking...";
  thinking.style.color = "#fff";
  chat.appendChild(thinking);
  chat.scrollTop = chat.scrollHeight;

  let reply = "";

  // 1️⃣ Try Gemini API
  try {
    reply = await callGeminiAPI(message);
    thinking.textContent = "Quantum AI: " + reply;
    return;
  } catch (err) {
    console.log("Gemini failed, switching to GPT-3.5");
  }

  // 2️⃣ Try GPT-3.5 API
  try {
    reply = await callGPT3API(message);
    thinking.textContent = "Quantum AI: " + reply;
    return;
  } catch (err) {
    console.log("GPT-3.5 failed, switching to HuggingFace text");
  }

  // 3️⃣ Try HuggingFace text API
  try {
    reply = await callHuggingFaceTextAPI(message);
    thinking.textContent = "Quantum AI: " + reply;
  } catch (err) {
    thinking.textContent = "Quantum AI: Sorry, something went wrong.";
    console.error(err);
  }
}

// Gemini API call
async function callGeminiAPI(message) {
  const response = await fetch('https://api.gemini.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_GEMINI_KEY'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

// GPT-3.5 API call
async function callGPT3API(message) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_GPT3_KEY'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

// HuggingFace text API call
async function callHuggingFaceTextAPI(message) {
  const response = await fetch('https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_HUGGINGFACE_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: message })
  });
  const data = await response.json();
  return data[0]?.generated_text || "HuggingFace did not return text.";
}

// HuggingFace image generation
async function generateImage() {
  const prompt = msgInput.value.trim();
  if (!prompt) return;

  showUserMessage(prompt);
  msgInput.value = '';

  const thinking = document.createElement("div");
  thinking.textContent = "Quantum AI: Generating image...";
  thinking.style.color = "#fff";
  chat.appendChild(thinking);
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_HUGGINGFACE_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    });
    const data = await response.json();
    thinking.remove();

    let imageUrl = data?.[0]?.url || data?.[0]?.generated_image || null;
    if (!imageUrl && data?.error) {
      showAIMessage("Image generation failed: " + data.error);
      return;
    }

    showAIImage(imageUrl);

  } catch (err) {
    thinking.textContent = "Quantum AI: Image generation failed.";
    console.error(err);
  }
    }    
