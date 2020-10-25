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
            devVariables.iteration++
            fs.writeFile('./dev-variables.json', JSON.stringify(devVariables), (err,files) => { })
            fs.writeFile('./src/json/dev-variables.json', JSON.stringify(devVariables), (err,files) => { })
        }
        console.log(devVariables)
    }

    async seedDynamo() {
        const devVariables = require('./dev-variables.json')
        if (!devVariables.seeded) {
            await dynamoSetup.createTables()
            dynamoSetup.seedTables()
        }

        devVariables.seeded = true
        fs.writeFile('./dev-variables.json', JSON.stringify(devVariables), (err,files) => { })
    }
    async seedDynamoDev() {
        const devVariables = require('./dev-variables.json')
        if (!devVariables.seeded) {
            await dynamoSetup.createTables('http://localhost:8000')
            dynamoSetup.seedTables('http://localhost:8000')
        }

        devVariables.seeded = true
        fs.writeFile('./dev-variables.json', JSON.stringify(devVariables), (err,files) => { })
    }

    resetSeed() {
        const devVariables = require('./dev-variables.json')
        devVariables.seeded = false
        fs.writeFile('./dev-variables.json', JSON.stringify(devVariables), (err,files) => { })
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
        case 'resetSeed':
            webpireScripts.resetSeed()
            break
        case 'seedDynamoDev':
            webpireScripts.seedDynamoDev()
            break
        default:
            console.log('Routed incorrectly...')
    }
}

module.exports = new WebpireScripts()