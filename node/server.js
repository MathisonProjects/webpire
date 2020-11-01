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

Plugins.WebpirePlugin.setEndpoint(envVariables.definitions['process.env.STAGE'].replace('"development"', 'development'))

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

express.get('/', (req, res) => {
  fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
      res.send(text);
  });
})

server.listen(PORT);
console.log(`--- Running on http://127.0.0.1:${PORT} ---`);