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
  const input=document.querySelector(`#${hub} input`);
  const box=document.getElementById(hub+"-chat");
  if(!input.value.trim())return;

  const u=document.createElement("div");
  u.className="chat-user";u.innerText=input.value;
  box.appendChild(u);input.value="";

  setTimeout(()=>{
    const a=document.createElement("div");
    a.className="chat-ai";a.innerText="Samajh gaya bhai 😎";
    box.appendChild(a);box.scrollTop=box.scrollHeight;
  },600);
}

function clearChat(hub){
  document.getElementById(hub+"-chat").innerHTML=
   `<div class="chat-ai">Fresh start 😎</div>`;
}

window.onload=()=>showSection("home");
