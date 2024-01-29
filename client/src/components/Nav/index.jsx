import { useState } from 'react'

import Auth from '@/utils/auth'
import {
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle
} from '@nextui-org/react'
import AuthForm from '../AuthForm'

function Nav() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const menuItems = [
		'Home',
		'Community',
		'About',
		'Generate',
		'Credits',
		'Our Team',
		'Collection',
		'Contact',
		'Help & Feedback'
	]

	const handleMobileMenuNav = function (item, index) {
		if (index === 0) {
			return '/'
		} else if (item === 'Credits') {
			return '/checkout'
		} else if (item === 'Our Team') {
			return '/team'
		}
		return `${item.toLowerCase()}`
	}

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className='sm:hidden'
				/>
				<NavbarBrand>
					<Link href='/' className='font-bold text-inherit'>A.I.conic</Link>
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
						href='/community'>
						Community
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
				{Auth.loggedIn() ? (
					<NavbarItem>
						<Link
							color='foreground'
							href='dashboard'>
							Dashboard
						</Link>
					</NavbarItem>
				) : null}
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
						href='/checkout'>
						Credits
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						color='foreground'
						href='/team'>
						Our Team
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
