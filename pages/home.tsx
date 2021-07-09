import { useApolloClient } from '@apollo/client'
import React from 'react'
import { useCookies } from 'react-cookie'
import { useIsAuthRequired } from '../hooks/useIsAuthRequired'
import firebase from '../init/firebase'
import { withApollo } from '../utils/withApollo'

const Home: React.FC = () => {
  const { loading } = useIsAuthRequired('/')
  const [_, __, removeTokenCookie] = useCookies(['token'])
  const apolloClient = useApolloClient()

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.error(error)
    }
    removeTokenCookie('token')
    apolloClient.resetStore()
  }

  return (
    <>
      <div>Home!</div>
      {
        loading ?
          <div>Loading...</div>
          :
          <button onClick={handleLogout}>
            Logout
          </button>
      }
    </>
  )
}

export default withApollo({ ssr: true })(Home)
