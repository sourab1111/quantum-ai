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
function sendMessage(hub){
    const input = document.querySelector(`#${hub} input`);
    const chatBox = document.getElementById(hub + "-chat");
    if(!input || input.value.trim()==="") return;

    // User message
    const userMsg = document.createElement("div");
    userMsg.className = "chat-user";
    userMsg.innerText = input.value;
    chatBox.appendChild(userMsg);

    const message = input.value;
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Show typing dots
    const typing = document.createElement("div");
    typing.className = "chat-ai";
    typing.innerHTML = `<span class="typingDots">Quantum AI typing<span>.</span><span>.</span><span>.</span></span>`;
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send message to backend
    const API_URL = "https://stanford-family-personnel-since.trycloudflare.com";   // <-- yaha tumhara public URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hub: hub, message: message })
    })
    .then(res => res.json())
    .then(data => {
        typing.remove();
        const aiMsg = document.createElement("div");
        aiMsg.className = "chat-ai";
        aiMsg.innerText = data.reply || "Sorry, koi reply nahi mila 😅";
        chatBox.appendChild(aiMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(err => {
        typing.remove();
        const aiMsg = document.createElement("div");
        aiMsg.className = "chat-ai";
        aiMsg.innerText = "Server error 😢, try again!";
        chatBox.appendChild(aiMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
        console.error(err);
    });
}

function clearChat(hub){
  document.getElementById(hub+"-chat").innerHTML=
   `<div class="chat-ai">Fresh start 😎</div>`;
}

window.onload=()=>showSection("home");
