import { useApolloClient } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useFlashcardsFeedLazyQuery, useForkFlashcardMutation } from '../generated/graphql'
import { useIsAuthRequired } from '../hooks/useIsAuthRequired'
import firebase from '../init/firebase'
import { withApollo } from '../utils/withApollo'

const Home: React.FC = () => {
  const { query, isReady, push, replace } = useRouter()
  const [tags, setTags] = useState<string[]>([])

  const { data: meData, loading: authChecking } = useIsAuthRequired()
  const [_, __, removeTokenCookie] = useCookies(['token'])
  const apolloClient = useApolloClient()
  const [forkFlashcard, { loading: forking }] = useForkFlashcardMutation()
  const [getFlashcardsFeed, { data, error, loading: fetching, fetchMore, variables }] = useFlashcardsFeedLazyQuery()

  useEffect(() => {
    if (!isReady) return

    let { tags } = query
    if (typeof tags === 'string') {
      tags = tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
    } else {
      tags = []
    }
    setTags(tags)
  }, [isReady])

  useEffect(() => {
    if (tags.length > 0) {
      // update query param
      replace({
        query: {
          ...query,
          tags: `${tags.join(',')}`
        }
      })
    }
  }, [tags])

  useEffect(() => {
    if (!isReady || authChecking || fetching || !meData?.me) return
    getFlashcardsFeed({
      variables: {
        limit: 10,
        tags: tags.length > 0 ? tags : undefined
      }
    })
  }, [fetching, getFlashcardsFeed, isReady, query, tags, authChecking, meData])

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.error(error)
    }
    removeTokenCookie('token')
    apolloClient.clearStore()
    push('/')
  }

  const handleFork = async (randId: string) => {
    if (forking) return
    const { errors, data } = await forkFlashcard({
      variables: {
        randId
      }
    })
    if (data?.forkFlashcard.forkedId) {
      push(`/flashcard/${data.forkFlashcard.forkedId}`)
    } else {
      console.error('cannot fork!', errors, data)
    }
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
        {/* use with filtering: https://primefaces.org/primereact/showcase/#/multiselect */}
        Total: {data.flashcardsFeed.total}
        HasMore: {data.flashcardsFeed.hasMore ? 'Yes' : 'No'}
        {
          data.flashcardsFeed.flashcards.map(f => (
            <div key={f.randId}>
              <Link href={`/flashcard/${f.randId}`}>
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
              {
                f.creator.username === meData?.me?.username &&
                <>
                  <button onClick={() => push(`/flashcard/edit/${f.randId}`)}>Edit</button>
                </>
              }
              {
                f.creator.username !== meData?.me?.username &&
                !f.isForkedByYou &&
                <>
                  <button onClick={() => handleFork(f.randId)}>Fork It!</button>
                </>
              }
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
