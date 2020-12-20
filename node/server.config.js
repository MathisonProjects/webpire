module.exports = {
    apps : [
        {
          name: "webpire-node",
          script: "/var/www/html/node/server.js",
          instances: 1,
          exec_mode: "cluster",
          watch: true,
          increment_var : 'PORT',
          env: {
              "STAGE": "production"
          }
        }
    ]
  }