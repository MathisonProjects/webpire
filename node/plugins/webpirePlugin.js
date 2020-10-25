const AWS = require('aws-sdk')
AWS.config.update({
    region: "us-west-2",
    endpoint: process.env.NODE_ENV === 'DEV' ? 'http://localhost:8000' : 'http://172.18.0.2:8000'
})
var docClient = new AWS.DynamoDB.DocumentClient()

class WebpirePlugin {
    testFire() {
        console.log('Test Fire Away!')
    }

    async routeFunction(endpoint, payload = null) {
        console.log('endpoint:',endpoint,' | ','payload:',payload)
        switch (endpoint) {
            case 'get dbstore':
                return await this.getDbStore()
            default:
                return this.responseHandler({}, 404)
                break
        }
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

    responseHandler(response, code = 200) {
        return {
            code: code,
            response: response
        }
    }
}

module.exports = new WebpirePlugin()