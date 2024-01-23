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

export async function main() {
    const s3Client = new S3Client({
        credentials: {
            accessKeyId: accessKey,
            secretAccessKey: secretAccessKey
        },
        region: bucketRegion
    })

    await s3Client.send(
        new PutObjectCommand({
            Bucket: bucketName,
            Key: 'my-fifth-object.txt',
            Body: "Hello JavaScript SDK!"
        })
    )

    await s3Client.send(
        new DeleteObjectCommand({ 
            Bucket: bucketName, 
            Key: 'my-fourth-object.txt' 
        })
    )

    const { Body } = await s3Client.send(
        new GetObjectCommand({
            Bucket: bucketName,
            Key: 'my-fifth-object.txt'
        })
    )

    console.log(await Body.transformToString());
}

main()

