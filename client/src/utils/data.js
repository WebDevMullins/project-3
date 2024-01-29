const presetColors = [
	{ hex: '#000000', name: 'Black' },
	{ hex: '#C0C0C0', name: 'Silver' },
	{ hex: '#808080', name: 'Gray' },
	{ hex: '#FFFFFF', name: 'White' },
	{ hex: '#800000', name: 'Maroon' },
	{ hex: '#FF0000', name: 'Red' },
	{ hex: '#800080', name: 'Purple' },
	{ hex: '#FF00FF', name: 'Fuchsia' },
	{ hex: '#008000', name: 'Green' },
	{ hex: '#00FF00', name: 'Lime' },
	{ hex: '#808000', name: 'Olive' },
	{ hex: '#FFFF00', name: 'Yellow' },
	{ hex: '#000080', name: 'Navy' },
	{ hex: '#0000FF', name: 'Blue' },
	{ hex: '#008080', name: 'Teal' },
	{ hex: '#00FFFF', name: 'Aqua' }
]

const styles = [
	{ name: '3D', value: ' 3D, volumetric, rendered, immersive' },
	{ name: 'Artwork', value: 'artwork, organic, hand-drawn, sketch-like' },
	{ name: 'Cartoon', value: 'cartoonish, fun, playful' },
	{ name: 'Chalk', value: 'chalkboard, textured, hand-drawn' },
	{ name: 'Clay', value: 'clay, claymation, clay-like, textured, sculpted' },
	{ name: 'Gradient', value: 'gradient, smooth, vibrant, transitional' },
	{ name: 'Grunge', value: 'grunge, distressed, gritty, grunge-inspired' },
	{ name: 'Illustrated', value: 'illustrated, hand-crafted, artistic' },
	{ name: 'Metallic', value: 'lustrous, polished, sleek' },
	{ name: 'Minimalistic', value: 'refined, minimalistic, simple' },
	{ name: 'Mosaic', value: 'complex, mosaic, intricate' },
	{ name: 'Neon', value: 'newo, luminous, bright, vivid' },
	{
		name: 'Polygon',
		value: 'geometric, angular, sharp, multi-sided, polygonal'
	},
	{ name: 'Popart', value: 'vibrant, bold, pop-art inspired' },
	{ name: 'Origami', value: 'folded, paper-like, origami-inspired' },
	{ name: 'Retro', value: 'nostalgic, classic, vintage, retro' },
	{ name: 'Sticker', value: 'bold, sticker-like, outlined' },
	{ name: 'Woodwork', value: 'engraved, woodcut, rustic' }
]

const tiers = {
	starter: [
		'50 Credits',
		'$0.10 per icon',
		'Basic icon customization options',
		'Unlimited icon storage',
		'Entry-level access to AI-generated icons',
		'Priority access to new features and updates'
	],
	plus: [
		'125 Credits',
		'$0.08 per icon',
		'Affordable pricing for individuals and small businesses',
		'Unlimited icon storage',
		'Priority access to new features and updates'
	],
	premium: [
		'250 Credits',
		'$0.06 per icon',
		'Ideal for businesses and designers with demanding icon creation requirements',
		'Suitable for users seeking the most flexibility and features',
		'Priority access to new features and updates'
	]
}

export { presetColors, styles, tiers }
