import { useState } from "react"
import { useCallback } from "react"
import { useSession, signIn, signOut } from "next-auth/react"


function ResponsiveNavbar({ route }) {
    // Auth
    const { data: session } = useSession()
    const handleSession = session ? () => signOut() : () => signIn()
    const username = session ? session.user.username : 'Connect'

    // Navbar text
    const navbarNormal = "text-base font-medium text-gray-500 hover:text-blue-900"
    const navbarBold = "text-base font-bold text-blue-600 hover:text-blue-900"

    // Mobile only: Hamburger button mecanics
    const [hiddenLabel, hideNavbar] = useState(false)
    const onClickHide = useCallback(() => hideNavbar(label => !label), [])
    var classNavbarMobile = "rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50"

    return (
        <div class="z-50">
            <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden bg-white">
                <div class={`${hiddenLabel ? 'block' : 'hidden'} ${classNavbarMobile}`}>
                    <div class="pt-5 pb-6 px-5">
                        <div class="flex items-center justify-between">
                            <div>
                                <img class="h-8 w-auto" src="https://cdn-icons-png.flaticon.com/512/2592/2592201.png" alt="Workflow"></img>
                            </div>
                            <div class="mr-2">
                                <button
                                    type="button"
                                    onClick={onClickHide}
                                    class="bg-red rounded-md p-2 inline-flex items-center justify-center 
                              text-gray-400 hover:text-blue-500 hover:bg-blue-900">
                                </button>
                            </div>
                        </div>
                        <div class="mt-6">
                            <nav class="grid gap-y-8">
                                <a href="/" class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span class="ml-3 text-base font-medium text-gray-900">
                                        Home
                                    </span>
                                </a>

                                <a href="/marketplace" class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <span class="ml-3 text-base font-medium text-gray-900">
                                        Marketplace
                                    </span>
                                </a>

                                <a href="/wall" class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span class="ml-3 text-base font-medium text-gray-900">
                                        Wall
                                    </span>
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div class="py-6 px-5 space-y-6 bg-white">
                        <div>
                            <button onClick={() => handleSession()} class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-700">
                                {username}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sticky top-0 z-50 max-w-10xl mx-auto px-4 sm:px-6">
                <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10 bg-white">
                    <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <a href="/">
                            <img class="block lg:hidden h-8 w-auto" src="https://cdn-icons-png.flaticon.com/512/2592/2592201.png" alt="" />
                            <img class="hidden lg:block h-8 w-auto" src="https://cdn-icons-png.flaticon.com/512/2592/2592201.png" alt="" />
                        </a>
                    </div>
                    <div class="-mr-2 -my-2 md:hidden">
                        <button type="button" onClick={onClickHide} class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" aria-expanded="false">
                            <span class="sr-only">Open menu</span>
                            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <nav class="hidden md:flex space-x-10">
                        <a href="/" class={route == "" ? navbarBold : navbarNormal}>
                            Home
                        </a>

                        <a href="/marketplace" class={route == "marketplace" ? navbarBold : navbarNormal}>
                            Marketplace
                        </a>
                        <a href="/wall" class={route == "wall" ? navbarBold : navbarNormal}>
                            Wall
                        </a>


                    </nav>
                    <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <button onClick={() => handleSession()} class="transition duration-500 ease-in-out ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 transform hover:-translate-y-1 hover:scale-110 hover:bg-blue-700">
                            {username}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Navigation bar
export default function Navbar({ children, route }) {

    return <ResponsiveNavbar route={route} />
}
