const AWS = require('./aws')
const Cognito = require('./cognito')
const s3 = require('./s3')
const { uuid } = require('uuidv4');

class WebpirePlugin {
    testFire() {
        console.log('Test Fire Away!')
    }

    async routeFunction(endpoint, payload = null) {
        console.log('endpoint:',endpoint,' | ','payload:',payload)

        const awsApp = (payload.alt_app_db !== undefined) ? AWS[payload.alt_app_db] : AWS.webpire
        if (payload.alt_app_db !== undefined) delete payload.alt_app_db

        switch (endpoint) {
            case 'get dbstore':
                return await this.getDbStore(awsApp)
            case "save dynamicTableContent":
                await this.saveRecord(awsApp,'proj_' + awsApp.env.APP_DB + '_dynamic_table_content', payload)
                return await this.getDbStore(awsApp)
            case "save dynamicTables":
                await this.saveRecord(awsApp,'proj_' + awsApp.env.APP_DB + '_dynamic_tables', payload)
                return await this.getDbStore(awsApp)
            case "save menu":
                await this.saveRecord(awsApp,'proj_' + awsApp.env.APP_DB + '_menu', payload)
                return await this.getDbStore(awsApp)
            case "save permissions":
                await this.saveRecord(awsApp,'proj_' + awsApp.env.APP_DB + '_permissions', payload)
                return await this.getDbStore(awsApp)
            case "save settings":
                await this.saveRecord(awsApp,'proj_' + awsApp.env.APP_DB + '_settings', payload)
                return await this.getDbStore(awsApp)
            case "delete dynamicTableContent":
                await this.deleteRecord(awsApp,'proj_' + awsApp.env.APP_DB + '_dynamic_table_content', payload)
                return await this.getDbStore(awsApp)
            case "delete dynamicTables":
                await this.deleteRecord(awsApp,'proj_' + awsApp.env.APP_DB + '_dynamic_tables', payload)
                return await this.getDbStore(awsApp)
            case "delete menu":
                await this.deleteRecord(awsApp,'proj_' + awsApp.env.APP_DB + '_menu', payload)
                return await this.getDbStore(awsApp)
            case "delete permissions":
                await this.deleteRecord(awsApp,'proj_' + awsApp.env.APP_DB + '_permissions', payload)
                return await this.getDbStore(awsApp)
            case "delete settings":
                await this.deleteRecord(awsApp,'proj_' + awsApp.env.APP_DB + '_settings', payload)
                return await this.getDbStore(awsApp)
            case 'account register':
                return await Cognito.registerUser(payload)
            case 'account login':
                return await Cognito.loginUser(payload)
            case 'account forget':
                break
            case "reset dynamicTableContent":
                await this.resetTable(awsApp,'proj_' + awsApp.env.APP_DB + '_dynamic_table_content')
                break
            case "reset dynamicTables":
                await this.resetTable(awsApp,'proj_' + awsApp.env.APP_DB + '_dynamic_tables')
                break
            case "reset menu":
                await this.resetTable(awsApp,'proj_' + awsApp.env.APP_DB + '_menu')
                this.repopulateTable(awsApp,'proj_' + awsApp.env.APP_DB + '_menu','menu')
                break
            case "reset permissions":
                await this.resetTable(awsApp,'proj_' + awsApp.env.APP_DB + '_permissions')
                break
            case "reset settings":
                await this.resetTable(awsApp,'proj_' + awsApp.env.APP_DB + '_settings')
                break
            case "get all users":
                return await this.getAllUsers()
                break
            case "upload file":
                s3.upload(payload)
            case "create tables":
                await this.createTables(awsApp)
                break
            case "create seed":
                await this.seedTables(awsApp)
                break
            default:
                return this.responseHandler({}, 404)
                break
        }
        return {}
    }

    async getAllUsers() {
        return await Cognito.allUsers()
    }

    async getDbStore(awsApp) {
        const tables = [ 'dynamic_table_content', 'dynamic_tables', 'menu', 'permissions', 'settings']
        let tableData = {}
        for (var i in tables) {
            const params = {
                TableName: 'proj_' + awsApp.env.APP_DB + '_' + tables[i]
            }
            tableData[tables[i]] = await awsApp.docClient.scan(params, (err, data) => { }).promise()
        }
        return tableData
    }

    async resetTable(awsApp,tableName) {
        const params = {
            TableName: tableName
        }
        await awsApp.docClient.scan(params, async (err, data) => {
            await data.Items.forEach( (item) => {
                let params = {
                    TableName: tableName,
                    Key: {
                        'id': item.id
                    }
                }
                awsApp.docClient.delete(params, (err2,data2) => {})
            })
        })
    }

    async repopulateTable(awsApp,tableName,seed) {
        const seedData = require('./seed/'+seed+'.json')
        seedData.forEach(item => {
            item.id = uuid()
            const params = {
                TableName: tableName,
                Item: item
            }
            awsApp.docClient.put(params, function(err, data) {})
        })
    }

    async saveRecord(awsApp,tableName, payload) {
        const params = {
            TableName: tableName,
            Item: payload
        }
        awsApp.docClient.put(params, function(err, data) {})
    }
    async deleteRecord(awsApp,tableName,payload) {
        const params = {
            TableName: tableName,
            Key: { 'id': payload.id }
        }
        awsApp.docClient.delete(params, function(err, data) {})
    }
    async createTables(awsApp){
        await this.createTable(awsApp,'_dynamic_tables')
        await this.createTable(awsApp,'_dynamic_table_content')
        await this.createTable(awsApp,'_menu')
        await this.createTable(awsApp,'_permissions')
        await this.createTable(awsApp,'_settings')
        setTimeout(() => {  console.log("DynamoDb Placed!"); }, 25000)
    }
    async createTable(awsApp,tableName) {
        const fullTableName = 'proj_' + awsApp.env.APP_DB + tableName

        try {
            var tableParams = {
                AttributeDefinitions: [ { AttributeName: 'id', AttributeType: 'S' } ],
                KeySchema: [ { AttributeName: 'id', KeyType: 'HASH' } ],
                ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
                TableName: fullTableName,
                StreamSpecification: { StreamEnabled: false }
              };
              await awsApp.dbHandler.createTable(tableParams, (err, data) => {}).promise();
        } catch(e) {
            console.log(fullTableName,'-',e, '-', e.message)
        }
    }
    async seedTables(awsApp) {
        const seedItems = {
            dynamic_table_content: require('./seed/dynamic_table_content.json'),
            dynamic_tables: require('./seed/dynamic_tables.json'),
            menu: require('./seed/menu.json'),
            permissions: require('./seed/permissions.json'),
            settings: require('./seed/settings.json')
        }

        for (var i in seedItems) {
            for (var j in seedItems[i]) {
                let record = seedItems[i][j]
                record.id = uuid()
                const payload = {
                    table : 'proj_' + awsApp.env.APP_DB + '_' + i,
                    data: record
                }

                this.insertRecord(awsApp,payload)
            }
        }
    }
    insertRecord(awsApp,payload) {
        const params = {
            TableName: payload.table,
            Item: payload.data
        }
        awsApp.docClient.put(params, function(err, data) {})
    }
    responseHandler(response, code = 200) {
        return {
            code: code,
            response: response
        }
    }
}

module.exports = new WebpirePlugin()