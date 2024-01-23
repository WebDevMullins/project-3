import {
    S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    DeleteObjectCommand,
    DeleteBucketCommand,
    paginateListObjectsV2,
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
    getObject: async function(fileName) {
        const { Body } =  await s3Client.send(
            new GetObjectCommand({
                Bucket: bucketName,
                Key: fileName
            })
        )
    }
}

// export async function main() {
//     const s3Client = new S3Client({
//         credentials: {
//             accessKeyId: accessKey,
//             secretAccessKey: secretAccessKey
//         },
//         region: bucketRegion
//     })

//     await s3Client.send(
//         new PutObjectCommand({
//             Bucket: bucketName,
//             Key: 'my-sixth-object.txt',
//             Body: "Hello JavaScript SDK!"
//         })
//     )

//     await s3Client.send(
//         new DeleteObjectCommand({ 
//             Bucket: bucketName, 
//             Key: 'my-fifth-object.txt' 
//         })
//     )

//     const { Body } = await s3Client.send(
//         new GetObjectCommand({
//             Bucket: bucketName,
//             Key: 'my-sixth-object.txt'
//         })
//     )

//     console.log(await Body.transformToString());
// }

main()