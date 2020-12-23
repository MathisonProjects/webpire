const express = require('express')()
const fs = require('fs')
const server = require('http').createServer(express)
const Dotenv = require('dotenv-webpack')
const io = require('socket.io')(server)
const Plugins = require('./plugins')
const env = process.env.STAGE ? process.env.STAGE : "development";
const envFile = './.env.'+env
const envVariables = new Dotenv({ path: envFile })
const port = { hot: parseInt(envVariables.definitions['process.env.HOT_PORT'].replace('"', '')), node: parseInt(envVariables.definitions['process.env.NODE_PORT'].replace('"', '')) }

// Constants
const PORT = port.node;

Plugins.WebpirePlugin.setEndpoint()

io.on('connection', socket => {
  socket.setMaxListeners(0)
  console.log('|             Well hello there            |')
  console.log("|_________________________________________|")

  socket.emit('connection confirmation', { response: 'Confirmed Node Server Connection...' })

  for (var i in Plugins.Router) {
    const route = Plugins.Router[i]
    socket.on(route, (payload = null) => {
      Plugins.WebpirePlugin.routeFunction(route, payload).then(response => {
        socket.emit('return ' + route, response)
      })
    })
  }

  socket.on('get conversations', (payload) => {
    Plugins.ChatPlugin.checkUserExists(payload.uid, __dirname)
    socket.emit('return get conversations', require(__dirname + '/conversations/' + payload.uid + '/chat_partners.json'))
  })
  socket.on('set conversation', (payload) => {
    Plugins.ChatPlugin.startConversation(payload, __dirname)
    socket.emit('return get conversations', require(__dirname + '/conversations/' + payload.uid + '/chat_partners.json'))
  })
  socket.on('get messages', (payload) => {
    Plugins.ChatPlugin.checkUserExists(payload.uid, __dirname)
    Plugins.ChatPlugin.checkMessageExists(payload.uid, payload.id, __dirname)
    socket.leaveAll()
    socket.join(payload.id)
    socket.emit('return get messages', require(__dirname + '/conversations/' + payload.uid + '/'+payload.id+'.json'))
  })
  socket.on('set message', (payload) => {
    Plugins.ChatPlugin.sendMessage(payload, __dirname)
    socket.emit('return get conversations', require(__dirname + '/conversations/' + payload.from + '/chat_partners.json'))
    socket.emit('return get messages', require(__dirname + '/conversations/' + payload.from + '/'+payload.conversation.id+'.json'))
    socket.to(payload.conversation.id).broadcast.emit('return get messages', require(__dirname + '/conversations/' + payload.from + '/'+payload.conversation.id+'.json'))
  })
  socket.on('payment process', (payload) => {
    Plugins.stripe.processPayment(payload)
  })
})

express.get('/', (req, res) => {
  fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
      res.send(text);
  });
})

server.listen(PORT);
console.log(' ')
console.log(' ')
console.log(' _________________________________________')
console.log("|                                         |")
console.log("|      Webpire NodeJS Server is Live      |")
console.log(`|---- Running on http://127.0.0.1:${PORT} ---|`);
console.log("|_________________________________________|")