import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLoginMutation, useUserQuery } from "../generated/graphql";
import firebase from '../init/firebase';
import Spinner from "./Spinner";

const Header = () => {
  const { query, push } = useRouter()
  const [loggingIn, setLoggingIn] = useState(false)

  const { loading, refetch: refetchMeQuery, data } = useUserQuery()
  const nextRoute = query.next ? query.next as string : '/feed'

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
        refetchMeQuery()
        push(nextRoute)
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
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" aria-label="Cruip">
              <a className="block">
                Flashcards!
              </a>
            </Link>
          </div>
          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
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
                        <Link href="/feed">
                          <a className="font-medium cursor-pointer text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
                            Explore
                          </a>
                        </Link>
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
