const openAI = require('openai')
const openai = new openAI({ apiKey: process.env.OPENAI_API_KEY })

async function generateImage({ prompt, color, style, count }) {
	const prompt = `${prompt}. Primarily colored ${color}. In a ${style} style.`
	const image = await openai.images.generate({
		model: 'dall-e-3',
		prompt,
		n: parseInt(count)
	})

	console.log(image.data)

	return image.data
}

module.exports = generateImage
