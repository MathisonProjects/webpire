const fs = require('fs')
const dynamoSetup = require('./migrations')
const funcFire = (process.env.FUNCFIRE !== undefined) ? process.env.FUNCFIRE : null

class WebpireScripts {
    cleanHotUpdate() {
        fs.readdir('./', (err, files) => {
            files.forEach(file => {
                if (file.includes('.hot-update.json')) {
                    fs.unlinkSync('./' + file)
                }
            })
        })
        fs.readdir('./dist/js/', (err, files) => {
          files.forEach(file => {
              if (file.includes('.hot-update.js')) {
                fs.unlinkSync('./dist/js/' + file)
              }
          })
      })
    }

    updateVersion(env) {
        console.log('--- Updating Version ---')
        const devVariables = require('./dev-variables.json')
        console.log('Environment:', env)
        if (env === 'development') {
            devVariables.build++
            fs.writeFile('./dev-variables.json', JSON.stringify(devVariables), (err,files) => { })
            if (devVariables.build % 25 === 0) {
                fs.writeFile('./src/json/dev-variables.json', JSON.stringify(devVariables), (err,files) => { })
                this.cleanHotUpdate()
            }
        }
        if (env === 'production') {
            devVariables.build = 0
            devVariables.iteration++
            fs.writeFile('./dev-variables.json', JSON.stringify(devVariables), (err,files) => { })
            fs.writeFile('./src/json/dev-variables.json', JSON.stringify(devVariables), (err,files) => { })
        }
        console.log(devVariables)
    }

    async seedDynamo() {
        await dynamoSetup.createTables()
        dynamoSetup.seedTables()
    }
}

if (funcFire !== null) routeFunction(funcFire)

function routeFunction(funcFire) {
    const webpireScripts = new WebpireScripts()
    switch (funcFire) {
        case "cleanHotUpdate":
            webpireScripts.cleanHotUpdate()
            break
        case 'updateVersion':
            webpireScripts.updateVersion('development')
            break
        case 'seedDynamo':
            webpireScripts.seedDynamo()
            break
        default:
            console.log('Routed incorrectly...')
    }
}

module.exports = new WebpireScripts()