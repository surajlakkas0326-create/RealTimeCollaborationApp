const express = require("express")
const http = require("http")
const cors = require("cors")
const mongoose = require("mongoose")
const { Server } = require("socket.io")

const Message = require("./models/Message")

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require("./users")

const app = express()
app.use(cors())

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/chatapp")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: "*" }
})

let totalMessages = 0

io.on("connection", socket => {

  console.log("User connected")

  socket.on("joinRoom", async ({ username, room }) => {

    const user = userJoin(socket.id, username, room)

    socket.join(user.room)

    // Load previous messages from MongoDB
    const oldMessages = await Message.find()

    oldMessages.forEach(msg=>{
      socket.emit("message", msg)
    })

    socket.emit("message", {
      user: "System",
      text: "Welcome to the chat",
      time: new Date().toLocaleTimeString()
    })

    socket.broadcast
    .to(user.room)
    .emit("message", {
      user: "System",
      text: `${user.username} joined the chat`,
      time: new Date().toLocaleTimeString()
    })

    // Send users + room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room)
    })

    // Update dashboard
    io.emit("dashboard", {
      totalMessages,
      activeUsers: getRoomUsers(user.room).length,
      room: user.room
    })

  })

  socket.on("chatMessage", async msg => {

    const user = getCurrentUser(socket.id)

    const messageData = {
      user: user.username,
      text: msg,
      time: new Date().toLocaleTimeString()
    }

    // Save message to MongoDB
    const newMessage = new Message(messageData)
    await newMessage.save()

    totalMessages++

    io.to(user.room).emit("message", messageData)

    // Update dashboard
    io.emit("dashboard", {
      totalMessages,
      activeUsers: getRoomUsers(user.room).length,
      room: user.room
    })

  })

  socket.on("typing", () => {

    const user = getCurrentUser(socket.id)

    if(user){
      socket.broadcast.to(user.room).emit("typing", user.username)
    }

  })

  socket.on("disconnect", () => {

    const user = userLeave(socket.id)

    if(user){

      io.to(user.room).emit("message", {
        user: "System",
        text: `${user.username} left the chat`,
        time: new Date().toLocaleTimeString()
      })

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room)
      })

      io.emit("dashboard", {
        totalMessages,
        activeUsers: getRoomUsers(user.room).length,
        room: user.room
      })

    }

  })

})

server.listen(5000, () => {
  console.log("Server running on port 5000")
})