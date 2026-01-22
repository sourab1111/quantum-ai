  /* ====================== SIDEBAR TOGGLE ====================== */
const sidebar = document.getElementById('sidebar');
document.getElementById('menu-toggle').onclick = () => {
    if(sidebar.style.left === '0px') sidebar.style.left = '-280px';
    else sidebar.style.left = '0px';
};

/* ====================== SECTION NAVIGATION ====================== */
function showSection(id){
    document.querySelectorAll('main section').forEach(sec=>{
        sec.classList.remove('active-section');
    });
    document.getElementById(id).classList.add('active-section');
    sidebar.style.left = '-280px';
}

/* ====================== OPEN CHAT FROM TOOL ====================== */
function openChat(tool){
    showSection('chat');
    document.getElementById('chat-mode-title').innerText = `⚡ ${tool.toUpperCase()} MODE`;
    document.getElementById('chat-window').innerHTML = `<div class="system-msg">Quantum AI ${tool} mode ready...</div>`;
}

/* ====================== HOME COMMAND BAR ====================== */
function sendCommand(){
    const cmd = document.getElementById('quick-command').value.trim();
    if(!cmd) return;
    // FUTURE: Replace alert with real API call
    alert(`Command typed: ${cmd}\n\n(Here you integrate GPT API)`);
    document.getElementById('quick-command').value = '';
}

/* ====================== CHAT INPUT ====================== */
function sendChat(){
    const chatInput = document.getElementById('chat-input');
    const msg = chatInput.value.trim();
    if(!msg) return;

    const chatWindow = document.getElementById('chat-window');
    
    // Display user message
    const userMsg = document.createElement('div');
    userMsg.textContent = `You: ${msg}`;
    userMsg.style.background = 'rgba(0,255,255,0.1)';
    userMsg.style.border = '1px solid #0ff';
    userMsg.style.borderRadius = '12px';
    userMsg.style.margin = '8px 0';
    userMsg.style.padding = '8px 12px';
    chatWindow.appendChild(userMsg);

    chatInput.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Display AI response placeholder
    const aiMsg = document.createElement('div');
    aiMsg.textContent = 'Quantum AI: Thinking...';
    aiMsg.className = 'system-msg';
    chatWindow.appendChild(aiMsg);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // FUTURE: Call API here (GPT/HF)
    // Example:
    // callGPT(msg, 'current-hub').then(reply => {
    //     aiMsg.textContent = `Quantum AI: ${reply}`;
    // });
}

/* ====================== INSIGHT HUB SEARCH ====================== */
function sendInsight(){
    const query = document.getElementById('insight-query').value.trim();
    if(!query) return;
    alert(`Searching insights for: ${query}\n\n(Integrate GPT/HF API here)`);
}

/* ====================== FUTURE: GPT / HF API PLACEHOLDER ====================== */
/*
async function callGPT(prompt, mode){
    // Backend endpoint: /api/gpt
    const response = await fetch('/api/gpt', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({prompt, mode})
    });
    const data = await response.json();
    return data.reply; // AI text reply
}

async function callHFText(prompt){
    // HuggingFace Text API
}

async function callHFImage(prompt){
    // HuggingFace Image API
}
*/

/* ====================== HISTORY (Future) ====================== */
function saveToHistory(hub, userMsg, aiMsg){
    // Implement storing history in localStorage or backend
    // Example:
    // localStorage.setItem('quantum-history', JSON.stringify(historyArray));
}
