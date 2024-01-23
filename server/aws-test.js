// this is just a file I use for testing

const {
    S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    DeleteObjectCommand,
    DeleteBucketCommand,
    paginateListObjectsV2,
    GetObjectCommand, 
} = require('@aws-sdk/client-s3')

const dotenv = require('dotenv')

dotenv.config()

const accessKey=process.env.ACCESS_KEY
const secretAccessKey=process.env.SECRET_ACCESS_KEY
const bucketName=process.env.BUCKET_NAME
const bucketRegion=process.env.BUCKET_REGION

async function main() {
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
            Key: 'my-ninth-object.txt',
            Body: "Hello JavaScript SDK!"
        })
    )

    // await s3Client.send(
    //     new DeleteObjectCommand({ 
    //         Bucket: bucketName, 
    //         Key: 'my-seventh-object.txt' 
    //     })
    // )

    // const { Body } = await s3Client.send(
    //     new GetObjectCommand({
    //         Bucket: bucketName,
    //         Key: 'my-eigth-object.txt'
    //     })
    // )

    // console.log(Body);
}

main()


