import { useState } from 'react'

import Auth from '@/utils/auth'
import {
	Image,
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
import Credits from '../Credits'

function Nav() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const menuItems = ['Home', 'Generate', 'Pricing', 'Our Team']

	const handleMobileMenuNav = function (item, index) {
		if (index === 0) {
			return '/'
		} else if (item === 'Credits') {
			return '/pricing'
		} else if (item === 'Our Team') {
			return '/team'
		}
		return `${item.toLowerCase()}`
	}

	return (
		<header>
			<Navbar onMenuOpenChange={setIsMenuOpen}>
				<NavbarContent>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
						className='sm:hidden'
					/>
					<NavbarBrand>
						<Link
							href='/'
							className='font-bold tracking-wide text-inherit'>
							<div className='flex items-center gap-2'>
								<Image
									src='/favicon.png'
									height={32}
									width={32}
								/>
								<p>
									<span className='text-primary'>AI</span>
									conic
								</p>
							</div>
						</Link>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent
					className='hidden sm:flex gap-4'
					justify='center'>
					{/* <NavbarItem>
						<Link
							color='foreground'
							href='/'>
							Home
						</Link>
					</NavbarItem> */}
					<NavbarItem>
						<Link
							color='foreground'
							href='/community'>
							Community
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
							href='/pricing'>
							Pricing
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
					{Auth.loggedIn() ? (
						<NavbarItem>
							<Credits />
						</NavbarItem>
					) : null}
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
		</header>
	)
}

export default Nav
