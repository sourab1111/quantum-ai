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

  // show user message
  const u = document.createElement("div");
  u.className = "chat-user";
  u.innerText = input.value;
  box.appendChild(u);

  const userMsg = input.value;
  input.value = "";

  // show typing...
  const t = document.createElement("div");
  t.className = "chat-ai";
  t.innerText = "Typing...";
  box.appendChild(t);
  box.scrollTop = box.scrollHeight;

  try{
    const res = await fetch("https://thus-conditioning-acer-use.trycloudflare.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg })
    });

    const data = await res.json();
    t.innerText = data.reply || "No reply";

  }catch(err){
    t.innerText = "Server error 😢";
    console.error(err);
  }
}

function clearChat(hub){
  document.getElementById(hub+"-chat").innerHTML=
   `<div class="chat-ai">Fresh start 😎</div>`;
}

window.onload=()=>showSection("home");
