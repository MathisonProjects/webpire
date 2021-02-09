const AWS = require('aws-sdk');
const Dotenv = require('dotenv')
global.crypto = require('crypto')
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const env = process.env.STAGE ? process.env.STAGE : "development";
const envFile = './.env.'+env
const envVariables = Dotenv.config({ path: envFile }).parsed

const cognitoVariables = {
    CLIENT_ID: envVariables.CLIENT_ID,
    APP_DOMAIN: envVariables.APP_DOMAIN,
    REDIRECT_URI: envVariables.REDIRECT_URI,
    USERPOOL_ID: envVariables.USERPOOL_ID,
    REDIRECT_URI_SIGNOUT: envVariables.REDIRECT_URI_SIGNOUT,
    APP_URL: envVariables.APP_URL,
    AWS_REGION: envVariables.AWS_REGION
}
AWS.config.region = envVariables.AWS_REGION

const poolInfo = {
    UserPoolId: cognitoVariables.USERPOOL_ID,
    ClientId: cognitoVariables.CLIENT_ID
}
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolInfo)

class AwsCognito {
    constructor() {}
    allUsers() {
        var params = {
            UserPoolId: poolInfo.UserPoolId
        }

        return new Promise((resolve,reject) => {
            var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18', region: cognitoVariables.AWS_REGION, endpoint: null, accessKeyId: envVariables.ACCESS_KEY_ID, secretAccessKey: envVariables.SECRET_ACCESS_KEY})

            cognitoidentityserviceprovider.listUsers(params, (err, data) => {
                if (err) {
                    console.log('err',err);
                    reject(err)
                }
                else {
                    resolve(data)
                }
            })
        })
    }
    countUsers() {}
    registerUser(payload) {
        const attributeList = []

        const dataEmail = new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: payload.email })
        attributeList.push(dataEmail)

        return new Promise((resolve, reject) => {
            userPool.signUp(payload.username, payload.password, attributeList, [], function( err, result) {
                if (err) {
                    resolve(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
    async loginUser(payload) {
        return new Promise((resolve, reject) => {
            var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
                Username: payload.username,
                Password: payload.password,
            })
            var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
                Username: payload.username,
                Pool: userPool,
            })

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: result => {
                    cognitoUser.getUserAttributes((err, attrs) => {
                        const responsePayload = {};
                        attrs.forEach(attr => (responsePayload[attr.Name] = attr.Value));
                        responsePayload.jwt = result.getIdToken().getJwtToken();
                        resolve(responsePayload);
                    });
                },
                onFailure: err => {
                    resolve({ payload: null, err });
                }
            })
        })
    }
    forgotUser() {
        return 'Endpoint under development...'
    }
    validateUser(payload) {
        var userData = {
            Username: payload.username,
            Pool: userPool,
        }
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
        return new Promise((resolve, reject) => {
            cognitoUser.confirmRegistration(payload.code, true, function(err, result) {
                if (err) {
                    resolve(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
    resendValidationUser(payload) {
        var userData = {
            Username: payload.username,
            Pool: userPool,
        }
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
        return new Promise((resolve, reject) => {
            cognitoUser.resendConfirmationCode(function(err, result) {
                if (err) {
                    resolve(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
    updateUser() {
        return 'Endpoint under development...'
    }
    disableUser() {
        return 'Endpoint under devleopment...'
    }
    logoutUser(payload) {
        var userData = {
            Username: payload.username,
            Pool: userPool,
        }
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
        cognitoUser.signOut()
    }
}


module.exports = new AwsCognito()