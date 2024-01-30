import { useState } from 'react'
import { useLocation } from 'react-router-dom'

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
	// State for mobile menu
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	// Get current path
	const path = useLocation().pathname

	// Menu items
	const menuItems = [
		{ name: 'Community', requiresAuth: false },
		{ name: 'Dashboard', requiresAuth: true },
		{ name: 'Generate', requiresAuth: false },
		{ name: 'Pricing', requiresAuth: false },
		{ name: 'Our Team', requiresAuth: false }
	]

	return (
		<header>
			<Navbar
				maxWidth='xl'
				onMenuOpenChange={setIsMenuOpen}
				classNames={{
					item: [
						'flex',
						'relative',
						'h-10',
						'items-center',
						"data-[active=true]:after:content-['']",
						'data-[active=true]:after:absolute',
						'data-[active=true]:after:bottom-0',
						'data-[active=true]:after:left-0',
						'data-[active=true]:after:right-0',
						'data-[active=true]:after:h-[2px]',
						'data-[active=true]:after:rounded-[2px]',
						'data-[active=true]:after:bg-primary'
					],
					menuItem: [
						'flex',
						'relative',
						'h-10',
						'items-center',
						"data-[active=true]:after:content-['']",
						'data-[active=true]:after:absolute',
						'data-[active=true]:after:bottom-0',
						'data-[active=true]:after:left-0',
						'data-[active=true]:after:right-0',
						'data-[active=true]:after:h-[2px]',
						'data-[active=true]:after:w-[85px]',
						'data-[active=true]:after:rounded-[2px]',
						'data-[active=true]:after:bg-primary'
					]
				}}>
				{/* Menu toggle in sm viewport */}
				<NavbarContent>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
						className='sm:hidden'
					/>
					{/* Icon and Name */}
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
				{/* Main Nav Content
					- Hidden in sm viewport
					- Visible in md+ viewport
					- Loop through menuItems array and render each item based on Auth status
				*/}
				<NavbarContent
					className='hidden sm:flex gap-4'
					justify='center'>
					{menuItems.map(
						(item, index) =>
							(!item.requiresAuth || Auth.loggedIn()) && (
								<NavbarItem
									key={`${item.name}-${index}`}
									isActive={
										path === `/${item.name}`.split(' ').join('').toLowerCase()
									}>
									<Link
										color={'foreground'}
										className={{}}
										href={`/${item.name}`.split(' ').join('').toLowerCase()}
										size='lg'>
										{item.name}
									</Link>
								</NavbarItem>
							)
					)}
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
				{/* Mobile Nav Menu
					- Hidden in md+ viewport
					- Visible in sm viewport
					- Loop through menuItems array and render each item based on Auth status
				*/}
				<NavbarMenu>
					{menuItems.map(
						(item, index) =>
							(!item.requiresAuth || Auth.loggedIn()) && (
								<NavbarMenuItem
									key={`${item.name}-${index}`}
									isActive={
										path === `/${item.name}`.split(' ').join('').toLowerCase()
									}>
									<Link
										color={'foreground'}
										className={{}}
										href={`/${item.name}`.split(' ').join('').toLowerCase()}
										size='lg'>
										{item.name}
									</Link>
								</NavbarMenuItem>
							)
					)}
					<NavbarMenuItem>
						<AuthForm />
					</NavbarMenuItem>
				</NavbarMenu>
			</Navbar>
		</header>
	)
}

export default Nav
