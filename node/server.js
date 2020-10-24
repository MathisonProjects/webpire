const express = require('express')()
const server = require('http').createServer(express)
const Dotenv = require('dotenv-webpack')
const io = require('socket.io')(server)
const Plugins = require('./plugins')
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const envFile = './.env.'+env
console.log(envFile)
const envVariables = new Dotenv({ path: envFile })
const port = { hot: parseInt(envVariables.definitions['process.env.HOT_PORT'].replace('"', '')), node: parseInt(envVariables.definitions['process.env.NODE_PORT'].replace('"', '')) }

// Constants
const PORT = port.node;

io.on('connection', socket => {
  console.log('Well hello there...')
  socket.emit('connection confirmation', { response: 'Confirmed Node Server Connection...' })

  for (var i in Plugins.Router) {
    const route = Plugins.Router[i]
    socket.on(route, (payload = null) => {
      Plugins.WebpirePlugin.routeFunction(route, payload).then(response => {
        socket.emit('return ' + route, response)
      })
    })
  }
})

server.listen(PORT);
console.log(`Running on http://127.0.0.1:${PORT}`);