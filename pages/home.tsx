import { useApolloClient } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useFlashcardsFeedLazyQuery } from '../generated/graphql'
import { useIsAuthRequired } from '../hooks/useIsAuthRequired'
import firebase from '../init/firebase'
import { withApollo } from '../utils/withApollo'

const Home: React.FC = () => {
  const { query, isReady } = useRouter()
  const { loading: authChecking } = useIsAuthRequired()
  const [_, __, removeTokenCookie] = useCookies(['token'])
  const apolloClient = useApolloClient()
  const [getFlashcardsFeed, { data, error, loading: fetching, fetchMore, variables }] = useFlashcardsFeedLazyQuery({
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    if (!isReady) return

    let { tags } = query
    if (typeof tags === 'string') {
      tags = [tags]
    }
    console.log({ tags })
    getFlashcardsFeed({
      variables: {
        limit: 10,
        tags
      }
    })
  }, [getFlashcardsFeed, isReady, query])

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.error(error)
    }
    removeTokenCookie('token')
    apolloClient.resetStore()
  }

  let pageContent: JSX.Element | null = null

  if (error) {
    pageContent = (
      <div>
        Something aint right!
      </div>
    )
  } else if (fetching || !isReady) {
    pageContent = (
      <div>Loading...</div>
    )
  } else if (!data) {
    pageContent = (
      <div>No data!</div>
    )
  } else {
    // console.log(data.flashcardsFeed.flashcards)
    pageContent = (
      <>
        Total: {data.flashcardsFeed.total}
        HasMore: {data.flashcardsFeed.hasMore ? 'Yes' : 'No'}
        {
          data.flashcardsFeed.flashcards.map(f => (
            <div key={f.id}>
              <Link href={`/flashcard/${f.id}`}>
                <a>
                  {f.title}
                  <br />
                  {f.difficulty}
                  <br />
                  {f.creator.name}
                  <br />
                  {f.createdAt}
                </a>
              </Link>
            </div>
          ))
        }
      </>
    )
  }

  return (
    <>
      <div>Home!</div>
      {
        authChecking ?
          <div>Loading...</div>
          :
          (
            <>
              <button onClick={handleLogout}>
                Logout
              </button>
              <Link href="/create">
                <a>Create New Flashcard</a>
              </Link>
              {pageContent}
            </>
          )
      }
    </>
  )
}

export default withApollo({ ssr: false })(Home)
