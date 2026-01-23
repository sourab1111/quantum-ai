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
  const box = document.getElementById(hub+"-chat");

  if(!input.value.trim()) return;

  // show user msg
  const u = document.createElement("div");
  u.className = "chat-user";
  u.innerText = input.value;
  box.appendChild(u);

  const userText = input.value;
  input.value = "";

  // typing msg
  const t = document.createElement("div");
  t.className = "chat-ai";
  t.innerText = "Typing...";
  box.appendChild(t);

  // SEND TO BACKEND
  fetch("http://localhost:5000/chat",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({ message: userText })
  })
  .then(res => res.json())
  .then(data => {
    t.remove();
    const a = document.createElement("div");
    a.className = "chat-ai";
    a.innerText = data.reply;
    box.appendChild(a);
    box.scrollTop = box.scrollHeight;
  })
  .catch(err=>{
    t.innerText = "Server error ❌";
    console.log(err);
  });
    }

function clearChat(hub){
  document.getElementById(hub+"-chat").innerHTML=
   `<div class="chat-ai">Fresh start 😎</div>`;
}

window.onload=()=>showSection("home");
