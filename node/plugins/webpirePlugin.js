const AWS = require('aws-sdk')
const Cognito = require('./cognito')
const { uuid } = require('uuidv4');
AWS.config.update({
    region: "us-west-2"
})
var docClient = null

class WebpirePlugin {
    testFire() {
        console.log('Test Fire Away!')
    }

    setEndpoint(stage) {
        AWS.config.update({
            endpoint: stage === 'development' ? 'http://localhost:8000' : 'http://172.18.0.2:8000'
        })
        docClient = new AWS.DynamoDB.DocumentClient()
    }

    async routeFunction(endpoint, payload = null) {
        console.log('endpoint:',endpoint,' | ','payload:',payload)

        switch (endpoint) {
            case 'get dbstore':
                return await this.getDbStore()
            case 'save dbstore pages':
                await this.saveRecord('proj_webpire_pages', payload)
                return await this.getDbStore()
            case "save dynamicTableContent":
                await this.saveRecord('proj_webpire_dynamic_table_content', payload)
                return await this.getDbStore()
            case "save dynamicTables":
                await this.saveRecord('proj_webpire_dynamic_tables', payload)
                return await this.getDbStore()
            case "save menu":
                await this.saveRecord('proj_webpire_menu', payload)
                return await this.getDbStore()
            case "save pages":
                await this.saveRecord('proj_webpire_pages', payload)
                return await this.getDbStore()
            case "save permissions":
                await this.saveRecord('proj_webpire_permissions', payload)
                return await this.getDbStore()
            case "save roles":
                await this.saveRecord('proj_webpire_roles', payload)
                return await this.getDbStore()
            case "save settings":
                await this.saveRecord('proj_webpire_settings', payload)
                return await this.getDbStore()
            case "save tags":
                await this.saveRecord('proj_webpire_tags', payload)
                return await this.getDbStore()
            case "delete dynamicTableContent":
                await this.deleteRecord('proj_webpire_dynamic_table_content', payload)
                return await this.getDbStore()
            case "delete dynamicTables":
                await this.deleteRecord('proj_webpire_dynamic_tables', payload)
                return await this.getDbStore()
            case "delete menu":
                await this.deleteRecord('proj_webpire_menu', payload)
                return await this.getDbStore()
            case "delete pages":
                await this.deleteRecord('proj_webpire_pages', payload)
                return await this.getDbStore()
            case "delete permissions":
                await this.deleteRecord('proj_webpire_permissions', payload)
                return await this.getDbStore()
            case "delete roles":
                await this.deleteRecord('proj_webpire_roles', payload)
                return await this.getDbStore()
            case "delete settings":
                await this.deleteRecord('proj_webpire_settings', payload)
                return await this.getDbStore()
            case "delete tags":
                await this.deleteRecord('proj_webpire_tags', payload)
                return await this.getDbStore()
            case 'account register':
                return await Cognito.registerUser(payload)
            case 'account login':
                return await Cognito.loginUser(payload)
            case 'account forget':
            case "reset dynamicTableContent":
                await this.resetTable('proj_webpire_dynamic_table_content')
                break
            case "reset dynamicTables":
                await this.resetTable('proj_webpire_dynamic_tables')
                break
            case "reset menu":
                await this.resetTable('proj_webpire_menu')
                this.repopulateTable('proj_webpire_menu','menu')
                break
            case "reset pages":
                await this.resetTable('proj_webpire_pages')
                break
            case "reset permissions":
                await this.resetTable('proj_webpire_permissions')
                break
            case "reset roles":
                await this.resetTable('proj_webpire_roles')
                break
            case "reset settings":
                await this.resetTable('proj_webpire_settings')
                break
            case "reset tags":
                await this.resetTable('proj_webpire_tags')
                break
            default:
                return this.responseHandler({}, 404)
                break
        }
        return {}
    }

    async getDbStore() {
        const tables = [ 'dynamic_table_content', 'dynamic_tables', 'menu', 'pages', 'permissions', 'roles', 'settings', 'tags']
        let tableData = {}
        for (var i in tables) {
            const params = {
                TableName: 'proj_webpire_' + tables[i]
            }
            tableData[tables[i]] = await docClient.scan(params, (err, data) => {}).promise()
        }
        return tableData
    }

    async resetTable(tableName) {
        const params = {
            TableName: tableName
        }
        await docClient.scan(params, async (err, data) => {
            await data.Items.forEach( (item) => {
                let params = {
                    TableName: tableName,
                    Key: {
                        'id': item.id
                    }
                }
                docClient.delete(params, (err2,data2) => {})
            })
        })
    }

    async repopulateTable(tableName,seed) {
        const seedData = require('./seed/'+seed+'.json')
        seedData.forEach(item => {
            item.id = uuid()
            const params = {
                TableName: tableName,
                Item: item
            }
            docClient.put(params, function(err, data) {})
        })
    }

    async saveRecord(tableName, payload) {
        const params = {
            TableName: tableName,
            Item: payload
        }
        docClient.put(params, function(err, data) {})
    }
    async deleteRecord(tableName,payload) {
        const params = {
            TableName: tableName,
            Key: { 'id': payload.id }
        }
        docClient.delete(params, function(err, data) {})
    }
    responseHandler(response, code = 200) {
        return {
            code: code,
            response: response
        }
    }
}

module.exports = new WebpirePlugin()