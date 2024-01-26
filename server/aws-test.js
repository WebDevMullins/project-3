// this is just a file I use for testing

const {
	S3Client,
	PutObjectCommand,
	CreateBucketCommand,
	DeleteObjectCommand,
	DeleteBucketCommand,
	paginateListObjectsV2,
	GetObjectCommand
} = require('@aws-sdk/client-s3')

const dotenv = require('dotenv')

dotenv.config()

const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION

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
			Body: 'Hello JavaScript SDK!'
		})
	)

	// await s3Client.send(
	//     new DeleteObjectCommand({
	//         Bucket: bucketName,
	//         Key: 'my-seventh-object.txt'
	//     })
	// )

	function encode(body) {
		let buf = Buffer.from(body);
		let base64 = buf.toString("base64");
		return base64;
	}

	const data = await s3Client.send(
		new GetObjectCommand({
			Bucket: bucketName,
			Key: 'bbJuliechen'
		})
	)

	const imageArray = await data.Body.transformToByteArray()
	console.log(imageArray)

	// encode(data.body)

	// console.log(Body)
	// console.log('===================')
	console.log('data:image/png;base64,' + encode(imageArray))
}

main()
