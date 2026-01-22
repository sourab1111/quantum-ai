const sidebar = document.getElementById("sidebar");
const statusText = document.querySelector(".status");

let currentSection = "home";

/* ========== SIDEBAR TOGGLE ========== */
function toggleSidebar(){
    if(sidebar.style.left === "0px"){
        sidebar.style.left = "-260px";
    } else {
        sidebar.style.left = "0px";
    }
}

/* ========== SECTION SWITCH WITH ANIMATION ========== */
function showSection(id){

    if(id === currentSection) return;

    const oldSection = document.getElementById(currentSection);
    const newSection = document.getElementById(id);

    oldSection.classList.remove("active-section");
    oldSection.style.opacity = "0";

    setTimeout(()=>{
        newSection.classList.add("active-section");
        newSection.style.opacity = "1";
        currentSection = id;
    },120);

    sidebar.style.left = "-260px";
}

/* ========== STATUS SIMULATION ========== */
function setStatus(text, color){
    statusText.innerText = text;
    statusText.style.color = color;
}

/* ========== CHAT SYSTEM (FAKE AI FEEL) ========== */
function sendMessage(hub){

    const input = document.querySelector(`#${hub} input`);
    const chatBox = document.getElementById(`${hub}-chat`);
    const msg = input.value.trim();

    if(!msg) return;

    // user bubble
    const userDiv = document.createElement("div");
    userDiv.className = "chat-user";
    userDiv.innerText = msg;
    chatBox.appendChild(userDiv);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // status processing
    setStatus("● Processing","orange");

    // typing indicator
    const typing = document.createElement("div");
    typing.className = "typing-indicator";
    typing.innerHTML = "<span></span><span></span><span></span>";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    // fake AI delay
    setTimeout(()=>{
        typing.remove();

        const aiDiv = document.createElement("div");
        aiDiv.className = "chat-ai";
        aiDiv.innerText = getHubReply(hub);

        chatBox.appendChild(aiDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        setStatus("● Online","#00ff6a");

    },1200 + Math.random()*1000);
}

/* ========== HUB BASED REPLIES (PLACEHOLDER) ========== */
function getHubReply(hub){

    if(hub === "student")
        return "Samajh gaya 👍, chalo is topic ko simple tareeke se samajhte hain.";

    if(hub === "creator")
        return "Nice idea 😎! Isko aur powerful bana sakte hain with better hooks.";

    if(hub === "insight")
        return "Interesting question… ispe thoda deep analysis karte hain.";

    if(hub === "lab")
        return "Experiment mode ON ⚡, dekhte hain kya result aata hai.";

    return "Processing your request...";
     }
