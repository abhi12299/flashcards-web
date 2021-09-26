import { useApolloClient } from '@apollo/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Avatar from '../../components/Avatar';
import Fab from '../../components/Fab';
import FlashcardsList from '../../components/FlashcardsList';
import Layout from '../../components/Layout';
import { useForkFlashcardMutation, useUserFlashcardsLazyQuery, useUserLazyQuery } from '../../generated/graphql';
import { useIsAuthRequired } from '../../hooks/useIsAuthRequired';
import { withApollo } from '../../utils/withApollo';
import Error from '../_error';

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
        limit: 12,
        username: username
      }
    })
  }, [userData, fcLoading, fcError, getUserFlashcards, username])

  if (authChecking || loading) {
    return null
  }

  if (error) {
    return <Error statusCode={500} />
  }

  if (!userData || !userData.user) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{userData.user.name}&apos;s Profile | Flashcards</title>
        <meta name="description" content="A community driven, open source flashcard website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container max-w-6xl mx-auto px-5 sm:px-6 pt-20 md:pt-30">
          <header className="flex flex-wrap flex-row items-center md:py-4">
            <div className="flex-2 md:ml-16">
              <div className="relative w-20 h-20 md:w-40 md:h-40">
                <Avatar name={userData.user.name} />
              </div>
            </div>
            <div className="flex-1 mt-2 ml-4 md:mt-0">
              <div className="md:flex-wrap md:items-center">
                <h2 className="md:text-3xl text-lg inline-block mb-2">
                  {userData.user.name}
                </h2>
              </div>
              <ul className="space-x-8 mb-4">
                <li>
                  <span className="font-semibold">{userData.user.numFlashcards}</span>
                  &nbsp;flashcard{userData.user.numFlashcards === 1 ? '' : 's'}
                </li>
              </ul>
            </div>
          </header>
          {
            userFcData && userFcData.userFlashcards.flashcards.length > 0 &&
            <div className="my-10">
              <FlashcardsList
                userData={meData}
                hasMore={userFcData.userFlashcards.hasMore}
                flashcards={userFcData.userFlashcards.flashcards}
                handleFork={handleFork}
                fetchMore={async () => {
                  if (!fetchMore || fcLoading) return
                  const { flashcards } = userFcData.userFlashcards
                  fetchMore({
                    variables: {
                      limit: 12,
                      cursor: flashcards[flashcards.length - 1].createdAt
                    }
                  })
                }}
              />
            </div>
          }
        </div>
        {userData.user.username === meData?.user?.username &&
          <Fab />
        }
      </Layout>
    </>
  )
}

export default withApollo({ ssr: false })(ProfilePage)

