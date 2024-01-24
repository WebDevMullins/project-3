const dotenv = require('dotenv')
dotenv.config()
const OpenAI = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function generateImage({ prompt, color, style, count }) {
	const finalPrompt = `${prompt}. Primarily colored ${color}. In a ${style} style.`
	const image = await openai.images.generate({
		model: 'dall-e-3',
		finalPrompt,
		n: parseInt(count)
	})

	console.log(image.data)

	return image.data
}

module.exports = generateImage
