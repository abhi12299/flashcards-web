import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TimeAgo from 'javascript-time-ago';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import Avatar from '../../components/Avatar';
import Fab from '../../components/Fab';
import Layout from '../../components/Layout';
import { Difficulty, FlashcardStatus, useFlashcardLazyQuery, useRespondToFlashcardMutation } from '../../generated/graphql';
import { useIsAuthRequired } from '../../hooks/useIsAuthRequired';
import { msToTime } from '../../utils/msToTime';
import { toTitleCase } from '../../utils/toTitleCase';
import { withApollo } from '../../utils/withApollo';
import Error from '../_error';

const MDRenderer = dynamic(
  () => import("../../components/MdRenderer"),
  { ssr: false }
);

const timeAgo = new TimeAgo('en-US')

const FlashcardPage: React.FC = () => {
  const { query: { id }, push } = useRouter()
  const timer = useRef(0)
  const { loading: authChecking, data: meData } = useIsAuthRequired()

  const [getFlashcard, { loading, error, data }] = useFlashcardLazyQuery({
    fetchPolicy: 'network-only'
  })
  const [respondToFlashcard, { loading: responding, called: responded }] = useRespondToFlashcardMutation()

  useEffect(() => {
    if (typeof id === 'string' && !loading && !data) {
      getFlashcard({ variables: { randId: id } })
    }
  }, [id, getFlashcard, loading, data])

  useEffect(() => {
    if (data && data.flashcard) {
      // start the timer
      timer.current = Date.now()
    }
  }, [data])

  const handleFlashcardResponse = (type: FlashcardStatus) => {
    if (responding) return
    const duration = timer.current ? Date.now() - timer.current : 0
    respondToFlashcard({
      variables: {
        randId: id as string,
        type,
        duration
      }
    })
  }

  const handleTagClick = (tag: string) => {
    push({
      pathname: '/feed',
      query: {
        tags: tag
      }
    })
  }

  const handleDifficultyClick = (d: Difficulty) => {
    push({
      pathname: '/feed',
      query: {
        difficulty: d
      }
    })
  }

  if (authChecking || loading) {
    return null
  }

  if (error) {
    return <Error statusCode={500} />
  }

  if (!data || !data.flashcard) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{data.flashcard.title} | Flashcards</title>
        <meta name="description" content="A community driven, open source flashcard website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Fab />
        <div className="z-10 container max-w-6xl mx-auto px-5 sm:px-6 pt-20 md:pt-30 pb-20">
          <h3 className="w-3/4 h3 font-bold py-5 outline-none">
            {data.flashcard.title}
            {
              data.flashcard.creator.username === meData?.user?.username &&
              <span className="cursor-pointer text-lg mx-4" onClick={() => push(`/flashcard/edit/${data.flashcard?.randId}`)}>
                <FontAwesomeIcon icon={faEdit} />
              </span>
            }
          </h3>
          <div className="flex items-center pb-5">
            <Link href={`/profile/${data.flashcard.creator.username}`}>
              <a>
                <div className="relative w-10 h-10 mr-4">
                  <Avatar name={data.flashcard.creator.name} />
                </div>
              </a>
            </Link>
            <div className="text-sm">
              <Link href={`/profile/${data.flashcard.creator.username}`}>
                <a>
                  <p className="leading-none line-clamp-1">{data.flashcard.creator.name}</p>
                </a>
              </Link>
              <p className="text-gray-600">{timeAgo.format(data.flashcard.createdAt)}</p>
            </div>
          </div>
          <div className="pb-3">
            {
              data.flashcard.tags.map(t => (
                <span
                  key={t.id}
                  style={{ overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '50%', textOverflow: 'ellipsis' }}
                  onClick={() => handleTagClick(t.name)}
                  className="tag-chips cursor-pointer inline-block my-1 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                  title={`#${t.name}`}
                >
                  {t.name}
                </span>
              ))
            }
          </div>
          <div className="pb-3 inline-block cursor-pointer" onClick={() => handleDifficultyClick(data.flashcard!.difficulty)}>
            <span className={`rounded-full mr-1 w-10 h-10 border-solid border-4 ${data.flashcard.difficulty === Difficulty.Easy ? 'border-green-600' : ''} ${data.flashcard.difficulty === Difficulty.Medium ? 'border-yellow-600' : ''} ${data.flashcard.difficulty === Difficulty.Hard ? 'border-red-600' : ''}`} />
            {toTitleCase(data.flashcard.difficulty)}
          </div>
          <hr />
          <div>
            {
              !responded &&
              <div className="mt-2">
                <h4 className="text-lg font-semibold">Do you know the answer?</h4>
                <div className="mt-2">
                  <button
                    disabled={responding}
                    onClick={() => handleFlashcardResponse(FlashcardStatus.KnowAnswer)}
                    className="ans-btn outline-none text-base bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
                  >
                    Yes
                  </button>
                  <button
                    disabled={responding}
                    onClick={() => handleFlashcardResponse(FlashcardStatus.DontKnowAnswer)}
                    className="ans-btn ml-2 outline-none text-base bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full"
                  >
                    No
                  </button>
                </div>
              </div>
            }
            {
              responded &&
              <div className="mt-5">
                <h5 className="h5 text-base font-medium">The Answer</h5>
                <div className="mt-2 bg-gray-50 p-6 rounded-lg shadow-lg">
                  <MDRenderer source={data.flashcard.body} />
                </div>
                {
                  data.flashcard.stats &&
                  <div className="mt-2">
                    <h4 className="h4 font-semibold text-lg">Your Stats</h4>
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
                      <div className="p-6 rounded-lg shadow-lg hover:bg-gray-100">
                        <h2 className="text-base font-bold mb-2 text-gray-800">Average time to solve</h2>
                        <p className="text-gray-700">{msToTime(data.flashcard.stats.avgTime)}</p>
                      </div>
                      <div className="p-6 rounded-lg shadow-lg hover:bg-gray-100">
                        <h2 className="text-base font-bold mb-2 text-gray-800">Previously attempted</h2>
                        <p className="text-gray-700">{data.flashcard.stats.numAttempts} times</p>
                      </div>
                      <div className="p-6 rounded-lg shadow-lg hover:bg-gray-100">
                        <h2 className="text-base font-bold mb-2 text-gray-800">Last seen</h2>
                        <p className="text-gray-700">{timeAgo.format(data.flashcard.stats.lastSeenOn)}</p>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </Layout>
    </>
  )
}

export default withApollo({ ssr: false })(FlashcardPage)
