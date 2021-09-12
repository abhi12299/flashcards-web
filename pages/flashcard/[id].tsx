import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { FlashcardStatus, useFlashcardLazyQuery, useRespondToFlashcardMutation } from '../../generated/graphql'
import { useIsAuthRequired } from '../../hooks/useIsAuthRequired'
import { withApollo } from '../../utils/withApollo'

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

  if (!data || !data.flashcard) {
    // goto 404
    return (
      <div>
        Not found!
      </div>
    )
  }

  return (
    <div>
      <Link href="/feed">
        <a>Go home</a>
      </Link>
      {
        data.flashcard.creator.username === meData?.me?.username &&
        <button onClick={() => push(`/flashcard/edit/${data.flashcard?.randId}`)}>
          Edit
        </button>
      }
      <h3>{data.flashcard.title}</h3>
      <p>By: {data.flashcard.creator.name}</p>
      <p>Difficulty: {data.flashcard.difficulty}</p>
      <p>
        Tags: {data.flashcard.tags.map(t => (
          <Link key={t.name} href={`/feed?tags=${t.name}`}>
            <a>#{t.name}
            </a>
          </Link>
        ))}
      </p>
      <p>Do you know the answer?</p>
      {
        !responded &&
        <>
          <button disabled={responding} onClick={() => handleFlashcardResponse(FlashcardStatus.KnowAnswer)}>Yes</button>
          <button disabled={responding} onClick={() => handleFlashcardResponse(FlashcardStatus.DontKnowAnswer)}>No</button>
        </>
      }
      {
        responded &&
        <div>
          {/* render markdown here */}
          <p>Body: {data.flashcard.body}</p>
          {
            data.flashcard.stats &&
            <>
              <p>Average time taken: {data.flashcard.stats.avgTime}</p>
              <p>Number of previous attempts: {data.flashcard.stats.numAttempts}</p>
              <p>Last responded at: {new Date(data.flashcard.stats.lastSeenOn).toLocaleString()}</p>
            </>
          }
        </div>
      }
    </div>
  )
}

export default withApollo({ ssr: false })(FlashcardPage)
