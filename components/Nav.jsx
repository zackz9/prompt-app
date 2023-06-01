'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react'; 
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';



const Nav = () => {

    const { data: session } = useSession();

    const [ providers, setProviders ] = useState(null); 
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();


            setProviders(response);
        }

        setUpProviders();

    }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
            <Image 
                className='object-contain'
                src="/assets/images/logo.svg" 
                alt='Prompt App Logo'
                width={30}
                height={30}
            />
            <p className='logo_text'>
                ForPrompts
            </p>

        </Link>

        {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
            { session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-post" className='black_btn'>
                        Create Post 
                    </Link>

                    <button type='button' onClick={signOut} className='outline_btn'>
                        Sign Out
                    </button>

                    <Link href="/profile">
                        <Image 
                            className='rounded-full'
                            src={ session?.user.image } 
                            alt='profile icon'
                            width={37}
                            height={37}
                        />
                    </Link>
                </div>
            ) : (
                <>
                    {
                        providers && 
                        Object.values(providers).map((provider) => (
                            <button 
                                className='black_btn'
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                            >
                                Sign In
                            </button>
                        ))
                    }
                </>
            )}
        </div>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
            {
                session?.user ? (
                    <div className='flex'>
                        <Image 
                            className='rounded-full'
                            src={ session?.user.image } 
                            alt='profile icon'
                            width={37}
                            height={37}
                            onClick={() => setToggleDropdown(prev => !prev) }
                        />

                       { toggleDropdown && (
                            <div className='dropdown'>
                                <Link 
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>

                                <Link 
                                    href='/create-post'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>

                                <button
                                    type='button'
                                    className='mt-5 w-full black_btn'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )} 
                    </div>
                ) : (
                    <>
                        {
                            providers && 
                            Object.values(providers).map((provider) => (
                                <button 
                                    className='black_btn'
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                )}
        </div>


    </nav>
  )
}

export default Nav