import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand, 
} from "@aws-sdk/client-s3"

import dotenv from 'dotenv'

dotenv.config()

const accessKey=process.env.ACCESS_KEY
const secretAccessKey=process.env.SECRET_ACCESS_KEY
const bucketName=process.env.BUCKET_NAME
const bucketRegion=process.env.BUCKET_REGION

const s3Client = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})

module.exports = {
    addObject: async function(fileName) {
        await s3Client.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: fileName,
                Body: "Hello JavaScript SDK!"
            })
        )
    },
    deleteObject: async function(fileName) {
        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: bucketName,
                Key: fileName
            })
        )
    },
    generateObjectUrl: async function(fileName) {
        return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`
    }
}