// ================= GLOBAL =================
let currentHub = "home";

// ================= SECTION SWITCH =================
function showSection(id){
    document.querySelectorAll(".hub").forEach(sec=>{
        sec.classList.remove("active");
    });

    const target = document.getElementById(id);
    if(target){
        target.classList.add("active");
        currentHub = id;
    }

    // hide sidebar after click
    document.getElementById("sidebar").classList.remove("show");

    // back button logic
    const backBtn = document.getElementById("topBackBtn");
    if(backBtn){
        if(id === "home") backBtn.style.display = "none";
        else backBtn.style.display = "block";
    }
}

// ================= SIDEBAR =================
function toggleSidebar(){
    document.getElementById("sidebar").classList.toggle("show");
}

// ================= NOTIFICATION =================
function toggleNotify(){
    document.getElementById("notifyPanel").classList.toggle("show");
}

// ================= CHAT SYSTEM =================
function sendMessage(hub){
    const input = document.querySelector(`#${hub} input`);
    const chatBox = document.getElementById(hub + "-chat");
    if(!input || input.value.trim()==="") return;

    // user msg
    const userMsg = document.createElement("div");
    userMsg.className = "chat-user";
    userMsg.innerText = input.value;
    chatBox.appendChild(userMsg);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // typing dots
    const typing = document.createElement("div");
    typing.className = "chat-ai";
    typing.innerHTML = `<span class="typingDots">Quantum AI typing<span>.</span><span>.</span><span>.</span></span>`;
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    // fake AI reply (demo)
    setTimeout(()=>{
        typing.remove();
        const aiMsg = document.createElement("div");
        aiMsg.className = "chat-ai";

        aiMsg.innerText = getDemoReply(hub);
        chatBox.appendChild(aiMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    },1200);
}

// ================= DEMO AI REPLIES =================
function getDemoReply(hub){
    if(hub==="student") return "Samajh gaya bhai 🙂, step by step explain kar deta hoon.";
    if(hub==="creator") return "Nice idea 😎, isko viral banane ke liye ye try karo...";
    if(hub==="insight") return "Interesting question 🤔, data ke hisaab se ye result nikalta hai...";
    if(hub==="lab") return "Experiment ready 🧪, parameters set kar raha hoon...";
    return "Processing...";
}

// ================= CLEAR CHAT =================
function clearChat(hub){
    const box = document.getElementById(hub+"-chat");
    if(box){
        box.innerHTML = `<div class="chat-ai">Fresh start 😎, bolo kya karna hai?</div>`;
    }
}

// ================= AUTO STATUS ANIMATION =================
setInterval(()=>{
    const status = document.querySelector(".status");
    if(!status) return;
    status.innerText = Math.random()>0.1 ? "● Online" : "● Processing";
},3000);

// ================= INIT =================
window.onload = ()=>{
    showSection("home");
};
