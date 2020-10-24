const express = require('express');
const Dotenv = require('dotenv-webpack');
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const envFile = './.env.'+env
console.log(envFile)
const envVariables = new Dotenv({ path: envFile })
const port = { hot: parseInt(envVariables.definitions['process.env.HOT_PORT'].replace('"', '')), node: parseInt(envVariables.definitions['process.env.NODE_PORT'].replace('"', '')) }

// Constants
const PORT = port.node;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT);
console.log(`Running on http://127.0.0.1:${PORT}`);