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
    const box = document.getElementById(hub + "-chat");
    if(!input.value.trim()) return;

    const msg = input.value;

    // User message
    const u = document.createElement("div");
    u.className = "chat-user";
    u.innerText = msg;
    box.appendChild(u);
    input.value = "";

    // Loading AI message
    const a = document.createElement("div");
    a.className = "chat-ai";
    a.innerText = "Thinking... 🤔";
    box.appendChild(a);
    box.scrollTop = box.scrollHeight;

    try {
        const response = await fetch(
            "https://loves-rare-achievements-ambient.trycloudflare.com/chat", // your public backend
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg })
            }
        );

        const data = await response.json();
        a.innerText = data.reply || "No reply 😢";

    } catch(err) {
        a.innerText = "Server error 😢";
        console.error(err);
    }

    box.scrollTop = box.scrollHeight;
          }

function clearChat(hub){
  document.getElementById(hub+"-chat").innerHTML=
   `<div class="chat-ai">Fresh start 😎</div>`;
}

window.onload=()=>showSection("home");
