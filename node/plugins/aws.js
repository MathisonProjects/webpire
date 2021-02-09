const AWS = require('aws-sdk')
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const siteList = require('../sitelist.json')
const Dotenv = require('dotenv')

const env = process.env.STAGE ? process.env.STAGE : "development";
const envFile = './.env.'+env
const envVariables = Dotenv.config({ path: envFile }).parsed

AWS.config.update({
    region: "us-west-2",
    accessKeyId: envVariables.ACCESS_KEY_ID,
    accessSecretKey: envVariables.SECRET_ACCESS_KEY,
    endpoint: 'https://dynamodb.us-west-2.amazonaws.com'
})

const awsConnect = {}

for (let i in siteList) {
    let siteVariables = Dotenv.config({ path: '.env.site.' + siteList[i] }).parsed

    if (awsConnect[siteList[i]] === undefined) awsConnect[siteList[i]] = { env: null, docClient: null, userPool: null}
    awsConnect[siteList[i]].env = siteVariables
    awsConnect[siteList[i]].dbHandler = new AWS.DynamoDB({apiVersion: '2012-08-10'})
    awsConnect[siteList[i]].docClient = new AWS.DynamoDB.DocumentClient()
    awsConnect[siteList[i]].userPool = new AmazonCognitoIdentity.CognitoUserPool({ UserPoolId: siteVariables.USERPOOL_ID, ClientId: siteVariables.CLIENT_ID })
}

module.exports = awsConnect