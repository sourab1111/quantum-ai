const chat = document.getElementById("chat");
const msgInput = document.getElementById("msgInput");

const modes = document.querySelectorAll(".mode");
const panels = document.querySelectorAll(".panel");

// Sidebar mode switch
modes.forEach(mode => {
  mode.addEventListener("click", () => {
    modes.forEach(m => m.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    mode.classList.add("active");
    document.getElementById(mode.dataset.mode + "Panel").classList.add("active");
  });
});

// Chat functions
function send() {
  const message = msgInput.value.trim();
  if (!message) return;
  addMsg(message, "user");
  msgInput.value = "";

  const thinking = addMsg("Processing neural data...", "ai");

  setTimeout(() => {
    thinking.innerText = "Quantum AI: Response generated successfully.";
  }, 1200);
}

function addMsg(text, type) {
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

// Image generation simulation
function generateFakeImage() {
  const imgPanel = document.querySelector(".image-preview");
  imgPanel.innerText = "🖼️ Generated Image: AI Style #" + Math.floor(Math.random()*100);
}
