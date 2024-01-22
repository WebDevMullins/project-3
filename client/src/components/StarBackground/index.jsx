import { PointMaterial, Points } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import * as random from 'maath/random/dist/maath-random.esm'
import { Suspense, useRef, useState } from 'react'

const StarBackground = (props) => {

	const ref = useRef()
	const [sphere] = useState(() =>
		random.inSphere(new Float32Array(5001), { radius: 1.2 })
	)

	useFrame((state, delta) => {
		ref.current.rotation.x -= delta / 10
		ref.current.rotation.y -= delta / 15
	})

	return (
		// eslint-disable-next-line react/no-unknown-property
		<group rotation={[0, 0, Math.PI / 4]}>
			<Points
				ref={ref}
				positions={sphere}
				stride={3}
				frustumCulled
				{...props}>
				<PointMaterial
					transparent
					color='white'
					size={0.002}
					sizeAttenuation={true}
					dethWrite={false}
				/>
			</Points>
		</group>
	)
}

const StarsCanvas = () => (
	<div className='w-full h-auto fixed inset-0 -z-20'>
		<Canvas camera={{ position: [0, 0, 1] }}>
			<Suspense fallback={null}>
				<StarBackground />
			</Suspense>
		</Canvas>
	</div>
)

export default StarsCanvas
