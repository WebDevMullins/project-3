import React from 'react'
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarMenuItem,
	Link
} from '@nextui-org/react'
import AuthForm from '../AuthForm'

function Nav() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false)
	const menuItems = [
		'Home',
		'About',
		'Generate',
		'Credits',
		'Collection',
		'Contact',
		'Help & Feedback',
		'Our Team'
	]

	const handleMobileMenuNav = function (item, index) {
		if (index === 0) {
			return '/'
		} else if (item === 'Credits') {
			return '/success'
		} else return `${item.toLowerCase()}`
	}

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className='sm:hidden'
				/>
				<NavbarBrand>
					<p className='font-bold text-inherit'>A.I.conic</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent
				className='hidden sm:flex gap-4'
				justify='center'>
				<NavbarItem>
					<Link
						color='foreground'
						href='/'>
						Home
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						color='foreground'
						href='/about'
						aria-current='page'>
						About
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						color='foreground'
						href='/generate'>
						Generate
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						color='foreground'
						href='/success'>
						Credits
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end'>
				<NavbarItem className='hidden md:flex'>
					<AuthForm />
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={'foreground'}
							className='w-40'
							href={handleMobileMenuNav(item, index)}
							size='lg'>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	)
}

export default Nav
