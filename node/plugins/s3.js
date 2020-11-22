const AWS = require('aws-sdk')
const Dotenv = require('dotenv')
const env = process.env.STAGE ? process.env.STAGE : "development";
const envFile = './.env.'+env
const envVariables = Dotenv.config({ path: envFile }).parsed
AWS.config.update({region: envVariables.AWS_REGION})
var s3 = new AWS.S3({apiVersion: '2016-04-18', region: envVariables.AWS_REGION, endpoint: null, accessKeyId: envVariables.ACCESS_KEY_ID, secretAccessKey: envVariables.SECRET_ACCESS_KEY})

class S3 {
    upload(payload) {
        let encodedImage = payload.file_data
        let decodedImage = Buffer.from(encodedImage, 'base64')
        var filePath = payload.file_name

        var params = {
            "Body": decodedImage,
            "Bucket": "upload.awsvuem.com",
            "Key": filePath  ,
            "ContentType" : payload.file_type,
            "ContentDisposition": "inline; filename="+ filePath,
            "ACL": "public-read"
        }

        s3.upload(params, (err, data) => {
            if(err) {
                console.log(err)
            } else {
                console.log(data)
            }
        })
    }
}

module.exports = new S3()