const AWS = require('aws-sdk');
global.crypto = require('crypto')
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

const cognitoVariables = {
    CLIENT_ID: 'iqjtlk1jvftkkjt6ha79gkd74',
    APP_DOMAIN: 'https://cognito.awsvuem.com',
    REDIRECT_URI: '/',
    USERPOOL_ID: 'us-west-2_EiWsSc27g',
    REDIRECT_URI_SIGNOUT: '/',
    APP_URL: 'localhost',
    AWS_REGION: 'us-west-2'
}
AWS.config.region = 'us-west-2'

const poolInfo = {
    UserPoolId: cognitoVariables.USERPOOL_ID,
    ClientId: cognitoVariables.CLIENT_ID
}
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolInfo)

class AwsCognito {
    constructor() {}
    allUsers() {
        return 'Endpoint under development...'
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