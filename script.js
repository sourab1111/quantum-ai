const chat = document.getElementById("chat");
const msgInput = document.getElementById("msgInput");

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
