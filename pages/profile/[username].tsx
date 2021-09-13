import { useApolloClient } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForkFlashcardMutation, useUserFlashcardsLazyQuery, useUserLazyQuery } from '../../generated/graphql';
import { useIsAuthRequired } from '../../hooks/useIsAuthRequired';
import { withApollo } from '../../utils/withApollo';

const ProfilePage: React.FC = () => {
  const { isReady, query: { username }, push } = useRouter()
  const { loading: authChecking, data: meData } = useIsAuthRequired()
  const apolloClient = useApolloClient()

  const [getUser, { error, loading, data: userData }] = useUserLazyQuery()
  const [
    getUserFlashcards,
    { error: fcError, loading: fcLoading, data: userFcData, fetchMore }
  ] = useUserFlashcardsLazyQuery()
  const [forkFlashcard, { loading: forking }] = useForkFlashcardMutation()

  const handleFork = async (randId: string) => {
    if (forking) return
    const { errors, data } = await forkFlashcard({
      variables: {
        randId
      },
      update(cache) {
        // TODO: make isForkedByYou true for current id in flashcardsFeed and userFlashcards
      }
    })
    if (data?.forkFlashcard.forkedId) {
      await push(`/flashcard/${data.forkFlashcard.forkedId}`)
      // remove this later
      apolloClient.cache.evict({ fieldName: 'flashcardsFeed' })
      apolloClient.cache.evict({ fieldName: 'userFlashcards' })
    } else {
      console.error('cannot fork!', errors, data)
    }
  }

  useEffect(() => {
    if (error || loading || !isReady || typeof username !== 'string') {
      return
    }
    getUser({
      variables: {
        username
      }
    })
  }, [isReady, getUser, error, loading, username])

  useEffect(() => {
    if (!userData || !userData.user || fcLoading || fcError || typeof username !== 'string') {
      return
    }
    getUserFlashcards({
      variables: {
        limit: 10,
        username: username
      }
    })
  }, [userData, fcLoading, fcError, getUserFlashcards, username])

  if (authChecking || loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    // maybe goto code 500
    return (
      <div>
        Error while fetching card!
      </div>
    )
  }

  if (!userData || !userData.user) {
    // goto 404
    return (
      <div>
        Not found!
      </div>
    )
  }

  return (
    <div>
      {/* also allow name editingif this is current user */}
      <h2>{userData.user.name}</h2>
      <img src={userData.user.profilePic} alt="avatar" />
      <p># of Flashcards: {userData.user.numFlashcards}</p>
      <hr />
      {
        userFcData && userFcData.userFlashcards.flashcards.length > 0 &&
        <>
          <p>Their flashcards:</p>
          {
            userFcData.userFlashcards.flashcards.map(f => (
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
                  f.creator.username === userData?.user?.username &&
                  <>
                    <button onClick={() => push(`/flashcard/edit/${f.randId}`)}>Edit</button>
                  </>
                }
                {
                  f.creator.username !== userData?.user?.username &&
                  !f.isForkedByYou &&
                  <>
                    <button onClick={() => handleFork(f.randId)}>Fork It!</button>
                  </>
                }
              </div>
            ))
          }
          {/* TODO: do infinite scrolling here */}
          {
            userFcData.userFlashcards.hasMore && fetchMore &&
            <button onClick={() => {
              const { flashcards } = userFcData.userFlashcards
              fetchMore({
                variables: {
                  limit: 10,
                  cursor: flashcards[flashcards.length - 1].createdAt
                }
              })
            }}>
              Load more
            </button>
          }
        </>
      }
    </div>
  )
}

export default withApollo({ ssr: false })(ProfilePage)

