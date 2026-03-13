const socket = io("http://localhost:5000")

// Get URL params
const params = new URLSearchParams(window.location.search)

const username = params.get("username")
const room = params.get("room")

// Join room
socket.emit("joinRoom",{username,room})

// DOM elements
const form = document.getElementById("chat-form")
const input = document.getElementById("msg")
const messages = document.getElementById("messages")
const usersList = document.getElementById("users")
const typingText = document.getElementById("typing")

const totalMessages = document.getElementById("totalMessages")
const roomName = document.getElementById("roomName")
const activeUsers = document.getElementById("activeUsers")
const connectionStatus = document.getElementById("connectionStatus")

// Show room name
if(roomName){
  roomName.innerText = room
}

// Connection status
socket.on("connect",()=>{
  if(connectionStatus){
    connectionStatus.innerText="Connected"
  }
})

socket.on("disconnect",()=>{
  if(connectionStatus){
    connectionStatus.innerText="Disconnected"
  }
})

// Receive message
socket.on("message",msg=>{

  const div = document.createElement("div")
  div.classList.add("message")

  // Right side if own message
  if(msg.user === username){
    div.classList.add("right")
  }else{
    div.classList.add("left")
  }

  div.innerHTML = `<b>${msg.user}</b> 
  <span class="time">${msg.time || ""}</span> <br>
  ${msg.text}`

  messages.appendChild(div)

  // Auto scroll
  messages.scrollTop = messages.scrollHeight

})

// Update active users list
socket.on("roomUsers",({room,users})=>{

  usersList.innerHTML=""

  users.forEach(user=>{
    const li=document.createElement("li")
    li.innerText=user.username
    usersList.appendChild(li)
  })

  // Active users count
  if(activeUsers){
    activeUsers.innerText = users.length
  }

  // Update room name from server
  if(roomName){
    roomName.innerText = room
  }

})

// Typing indicator
socket.on("typing",(user)=>{

  typingText.innerText=`${user} is typing...`

  setTimeout(()=>{
    typingText.innerText=""
  },1000)

})

// Dashboard message counter
socket.on("dashboard",({totalMessages:count})=>{

  if(totalMessages){
    totalMessages.innerText=count
  }

})

// Send typing event
input.addEventListener("keypress",()=>{
  socket.emit("typing")
})

// Send message
form.addEventListener("submit",e=>{

  e.preventDefault()

  const message = input.value.trim()

  if(message === "") return

  socket.emit("chatMessage",message)

  input.value=""

})

// Emoji add function
function addEmoji(emoji){
  input.value += emoji
  input.focus()
}