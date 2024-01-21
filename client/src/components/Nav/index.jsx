import Auth from '../../utils/auth'
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

function Nav() {

	const [isMenuOpen, setIsMenuOpen] = React.useState(false)
	  const menuItems = [
			'Profile',
			'Dashboard',
			'Activity',
			'Analytics',
			'System',
			'Deployments',
			'My Settings',
			'Team Settings',
			'Help & Feedback',
			'Log Out'
		]

	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<ul className='flex-row'>
					<li className='mx-1'>
						<Link to='/orderHistory'>Order History</Link>
					</li>
					<li className='mx-1'>
						{/* this is not using the Link component to logout or user and then refresh the application to the start */}
						<a
							href='/'
							onClick={() => Auth.logout()}>
							Logout
						</a>
					</li>
				</ul>
			)
		} else {
			return (
				<ul className='flex-row'>
					<li className='mx-1'>
						<Link to='/signup'>Signup</Link>
					</li>
					<li className='mx-1'>
						<Link to='/login'>Login</Link>
					</li>
				</ul>
			)
		}
	}

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className='sm:hidden'
				/>
				<NavbarBrand>
					<p className='font-bold text-inherit'>ACME</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent
				className='hidden sm:flex gap-4'
				justify='center'>
				<NavbarItem>
					<Link
						color='foreground'
						href='#'>
						Features
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link
						href='#'
						aria-current='page'>
						Customers
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						color='foreground'
						href='#'>
						Integrations
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end'>
				<NavbarItem className='hidden lg:flex'>
					<Link href='#'>Login</Link>
				</NavbarItem>
				<NavbarItem>
					<Button
						as={Link}
						color='primary'
						href='#'
						variant='flat'>
						Sign Up
					</Button>
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
