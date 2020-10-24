const { uuid } = require('uuidv4');
const AWS = require('aws-sdk')
AWS.config.update({
    region: "us-west-1",
    endpoint: 'http://localhost:8000'
})
// Use the local Docker endpoint if executed locally

const dbHandler = new AWS.DynamoDB({apiVersion: '2012-08-10'})
var docClient = new AWS.DynamoDB.DocumentClient()
const dbKey = 'webpire'

module.exports = {
    async createTables() {
        await this.createTable(dbKey + '_dynamic_tables')
        await this.createTable(dbKey + '_dynamic_table_content')
        await this.createTable(dbKey + '_menu')
        await this.createTable(dbKey + '_tags')
        await this.createTable(dbKey + '_pages')
        await this.createTable(dbKey + '_permissions')
        await this.createTable(dbKey + '_roles')
        await this.createTable(dbKey + '_settings')
    },
    seedTables() {
        const seedItems = {
            dynamic_table_content: require('./seed/dynamic_table_content.json'),
            dynamic_tables: require('./seed/dynamic_tables.json'),
            menu: require('./seed/menu.json'),
            pages: require('./seed/pages.json'),
            permissions: require('./seed/permissions.json'),
            roles: require('./seed/roles.json'),
            settings: require('./seed/settings.json'),
            tags: require('./seed/tags.json')
        }

        for (var i in seedItems) {
            for (var j in seedItems[i]) {
                let record = seedItems[i][j]
                record.id = uuid()
                const payload = {
                    table : 'proj_' + dbKey + '_' + i,
                    data: record
                }

                this.insertRecord(payload)
            }
        }
    },
    async createTable(tableName) {
        try {
            var tableParams = {
                AttributeDefinitions: [ { AttributeName: 'id', AttributeType: 'S' } ],
                KeySchema: [ { AttributeName: 'id', KeyType: 'HASH' } ],
                ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
                TableName: 'proj_' + tableName,
                StreamSpecification: { StreamEnabled: false }
              };
              await dbHandler.createTable(tableParams, (err, data) => {}).promise();
        } catch(e) {
            console.log(tableName,'-',e.code, '-', e.message)
        }
    },
    insertRecord(payload) {
        const params = {
            TableName: payload.table,
            Item: payload.data
        }
        docClient.put(params, function(err, data) {})
    }
}