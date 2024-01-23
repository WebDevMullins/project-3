import React from 'react'
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarMenuItem,
	Link,
	Button
} from '@nextui-org/react'
import AuthForm from '../AuthForm'

function Nav() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false)
	const menuItems = [
		'Home',
		'Generate',
		'Collection',
		'About',
		'Contact',
		'Deployments',
		'My Settings',
		'Team Settings',
		'Help & Feedback',
		'Log Out'
	]


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
				<NavbarItem >
					<Link
						color='foreground'
						href='/'>
						Home
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link
						href='#'
						aria-current='page'>
						About
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						color='foreground'
						href='#'>
						Generate
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end'>
				<NavbarItem className='hidden md:flex'>
					<AuthForm/>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={
								index === 2
									? 'primary'
									: index === menuItems.length - 1
										? 'danger'
										: 'foreground'
							}
							className='w-full'
							href='#'
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
