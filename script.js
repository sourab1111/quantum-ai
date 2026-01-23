let currentHub="home";

function showSection(id){
  document.querySelectorAll(".hub").forEach(h=>h.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.getElementById("sidebar").classList.remove("show");

  const back=document.getElementById("topBackBtn");
  back.style.display = (id==="home") ? "none":"inline-block";
}

function toggleSidebar(){
  document.getElementById("sidebar").classList.toggle("show");
}

async function sendMessage(hub){
    const input = document.querySelector(`#${hub} input`);
    const chatBox = document.getElementById(hub + "-chat");
    if(!input || input.value.trim() === "") return;

    // User message display
    const userMsg = document.createElement("div");
    userMsg.className = "chat-user";
    userMsg.innerText = input.value;
    chatBox.appendChild(userMsg);

    const messageText = input.value;
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Typing indicator
    const typing = document.createElement("div");
    typing.className = "chat-ai";
    typing.innerHTML = "Quantum AI typing<span>.</span><span>.</span><span>.</span>";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // API call to your backend
        const response = await fetch("http://localhost:5000/api/chat", {  // <-- backend URL
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ hub, message: messageText })
        });

        const data = await response.json();
        typing.remove();

        // AI response display
        const aiMsg = document.createElement("div");
        aiMsg.className = "chat-ai";
        aiMsg.innerText = data.reply;  // backend se real reply
        chatBox.appendChild(aiMsg);
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (err) {
        typing.remove();
        const errorMsg = document.createElement("div");
        errorMsg.className = "chat-ai";
        errorMsg.innerText = "⚠ Server se connection nahi ho paaya";
        chatBox.appendChild(errorMsg);
    }
                                           }

function clearChat(hub){
  document.getElementById(hub+"-chat").innerHTML=
   `<div class="chat-ai">Fresh start 😎</div>`;
}

window.onload=()=>showSection("home");
