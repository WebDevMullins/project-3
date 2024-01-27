const {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand
} = require('@aws-sdk/client-s3')

const dotenv = require('dotenv')

dotenv.config()

const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION

const s3Client = new S3Client({
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretAccessKey
	},
	region: bucketRegion
})

const encode = body => {
	let buf = Buffer.from(body)
	let base64 = buf.toString('base64')
	return base64
}

module.exports = {
	addObject: async function (fileName) {
		await s3Client.send(
			new PutObjectCommand({
				Bucket: bucketName,
				Key: fileName,
				Body: 'Hello JavaScript SDK!'
			})
		)
	},
	deleteObject: async function (fileName) {
		await s3Client.send(
			new DeleteObjectCommand({
				Bucket: bucketName,
				Key: fileName
			})
		)
	},
	generateObjectUrl: async function (fileName) {
		return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`
	},
	generateObjectData: async function (fileName) {
		const data = await s3Client.send(
			new GetObjectCommand({
				Bucket: bucketName,
				Key: fileName
			})
		)
		const imageArray = await data.Body.transformToByteArray()
		const imageSrc = 'data:image/png;base64,' + encode(imageArray)
		return imageSrc
	}
}
