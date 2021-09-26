import { useApolloClient } from "@apollo/client";
import { faBinoculars, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useLoginMutation, UserDocument, UserQuery, useUserQuery } from "../generated/graphql";
import firebase from '../init/firebase';
import logo from '../public/logo.png';
import Avatar from "./Avatar";
import Spinner from "./Spinner";

const ProfileAvatarDropdown: React.FC<{
  user: UserQuery['user']
}> = ({ user }) => {
  const { push } = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [_, __, removeTokenCookie] = useCookies(['token'])
  const apolloClient = useApolloClient()
  const ref = useRef<HTMLUListElement>(null)

  const handleLogout = async () => {
    if (loading) return
    try {
      setLoading(true)
      setShowDropdown(false)
      await firebase.auth().signOut()
    } catch (error) {
      console.error(error)
    }
    removeTokenCookie('token', {
      expires: new Date(0)
    })
    // clear store does not trigger query refetch
    await apolloClient.clearStore()
    await apolloClient.refetchQueries({
      include: [UserDocument]
    })
    push('/')
    setLoading(false)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (event.target) {
        const t = event.target as HTMLElement
        if (t.closest('div#header-avatar')) {
          // this means we clicked on avatar
          setShowDropdown(!showDropdown)
          return
        }
      }
      if (ref.current && !ref.current.contains(event.target as Node)) {
        showDropdown && setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, showDropdown]);

  return (
    <div className="relative">
      <div id="header-avatar" className="cursor-pointer">
        <div className="relative w-12 h-12">
          {
            loading ?
              <div className="w-10 h-10">
                <Spinner />
              </div>
              :
              <Avatar name={user!.name} />
          }
        </div>
      </div>
      {
        showDropdown &&
        <ul ref={ref} className="absolute w-56 p-2 mt-2 text-gray-600 bg-white border border-gray-100 rounded-lg shadow-md min-w-max-content dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700 right-0" aria-label="submenu">
          <li className="mb-2 last:mb-0">
            <a onClick={() => {
              setShowDropdown(false)
              push('/feed')
            }} className="inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
              <FontAwesomeIcon className="w-5 h-5 mr-3" icon={faBinoculars} />
              <span>Explore</span>
            </a>
          </li>
          <li className="mb-2 last:mb-0">
            <a onClick={() => {
              setShowDropdown(false)
              push(`/profile/${user!.username}`)
            }} className="inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
              <FontAwesomeIcon className="w-5 h-5 mr-3" icon={faUser} />
              <span>Profile</span>
            </a>
          </li>
          <li className="mb-2 last:mb-0">
            <a onClick={handleLogout} className="inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
              <FontAwesomeIcon className="w-5 h-5 mr-3" icon={faSignOutAlt} />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      }
    </div>
  )
}

const Header = () => {
  const { push } = useRouter()
  const [loggingIn, setLoggingIn] = useState(false)

  const { loading, refetch: refetchMeQuery, data } = useUserQuery()

  const [login] = useLoginMutation()
  const [_, setTokenCookie] = useCookies(['token'])

  const handleLogin = async () => {
    try {
      if (loading || loggingIn) return
      setLoggingIn(true)
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider)
      const user = firebase.auth().currentUser;
      if (!user) {
        return
      }
      const idToken = await user.getIdToken()
      if (!idToken) {
        return
      }
      const response = await login({
        variables: {
          idToken,
          name: user.displayName || ''
        }
      })
      if (response.data?.login.errors) {
        console.error(response.data.login.errors)
      } else {
        setTokenCookie('token', response.data?.login.accessToken!, {
          maxAge: (Date.now() + (1000 * 60 * 24 * 365)) / 1000 // 1y from now in seconds
        })
        await refetchMeQuery()
        push('/feed')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoggingIn(false)
    }
  }

  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <header className={`top-0 fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white blur shadow-lg'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="mx-5 md:mx-0 flex-shrink-0">
            <Link href="/">
              <a className="logo-container relative block">
                <Image src={logo} quality="100" layout="fill" alt="logo" />
              </a>
            </Link>
          </div>
          <nav className="flex flex-grow">
            {
              data?.user &&
              <ul className="flex flex-row justify-end flex-wrap flex-grow mr-10">
                <li
                  className="hidden md:flex font-medium cursor-pointer text-gray-600 hover:text-gray-900 px-5 py-3 items-center transition duration-150 ease-in-out"
                >
                  <Link href="/create"><a>New Flashcard</a></Link>
                </li>
                <li
                  className="hidden md:flex font-medium cursor-pointer text-gray-600 hover:text-gray-900 px-5 py-3 items-center transition duration-150 ease-in-out"
                >
                  <Link href="/feed"><a>Explore</a></Link>
                </li>
              </ul>
            }
            <ul className={`${!data?.user ? 'flex-grow' : ''} flex flex-row justify-items-end justify-end flex-wrap items-center`}>
              <li>
                {
                  loading ?
                    <>
                      <div className="w-10 h-10">
                        <Spinner />
                      </div>
                    </>
                    :
                    (
                      data?.user ?
                        <ProfileAvatarDropdown user={data.user} />
                        :
                        <a
                          className="font-medium cursor-pointer text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                          onClick={handleLogin}
                        >
                          {
                            loggingIn ?
                              <div className="w-10 h-10">
                                <Spinner />
                              </div>
                              :
                              'Sign in'
                          }
                        </a>
                    )
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
