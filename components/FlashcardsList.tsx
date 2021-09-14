import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FlashcardsFeedQuery, UserFlashcardsQuery, UserQuery } from '../generated/graphql';

const FlashcardsList: React.FC<{
  hasMore: boolean;
  fetchMore: () => Promise<void>;
  flashcards: UserFlashcardsQuery['userFlashcards']['flashcards'] | FlashcardsFeedQuery['flashcardsFeed']['flashcards'];
  userData?: UserQuery;
  handleFork: (randId: string) => Promise<any>;
}> = ({ flashcards, fetchMore, hasMore, userData, handleFork }) => {
  const { push } = useRouter()

  return (
    <InfiniteScroll
      dataLength={flashcards.length}
      next={() => {
        if (!fetchMore) return
        fetchMore()
      }}
      hasMore={hasMore}
      loader={<div>Loading...</div>}
    >
      {
        flashcards.map(f => (
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
            <hr />
          </div>
        ))
      }
    </InfiniteScroll>
  )
}

export default FlashcardsList