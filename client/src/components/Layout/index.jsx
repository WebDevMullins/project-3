import Footer from '@components/Footer'
import Nav from '@components/Nav'

const Layout = ({ children }) => {
	return (
		<div className='flex flex-col h-screen justify-between'>
			<Nav />
			<main className='flex flex-col'>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
