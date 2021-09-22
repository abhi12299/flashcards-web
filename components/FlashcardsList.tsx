import TimeAgo from 'javascript-time-ago';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FlashcardsFeedQuery, UserFlashcardsQuery, UserQuery } from '../generated/graphql';
import Spinner from './Spinner';

const timeAgo = new TimeAgo('en-US')

const FlashcardsList: React.FC<{
  hasMore: boolean;
  fetchMore: () => Promise<void>;
  flashcards: UserFlashcardsQuery['userFlashcards']['flashcards'] | FlashcardsFeedQuery['flashcardsFeed']['flashcards'];
  userData?: UserQuery;
  handleFork: (randId: string) => Promise<any>;
}> = ({ flashcards, fetchMore, hasMore, userData, handleFork }) => {
  const { push, replace, query } = useRouter()

  const handleTagClick = (tag: string) => {
    replace({
      query: {
        ...query,
        tags: tag
      },
    }, undefined, { shallow: true })
  }

  return (
    <InfiniteScroll
      dataLength={flashcards.length}
      next={() => {
        if (!fetchMore) return
        fetchMore()
      }}
      className="mt-10 grid gap-2 sm:grid-cols-2 md:grid-cols-3 grid-cols-1"
      hasMore={hasMore}
      loader={
        <div className="text-center col-span-full w-1/4 h-1/4 mx-auto">
          <Spinner />
        </div>
      }
    >
      {
        flashcards.map(f => (
          <div className="col-span-1" style={{ minHeight: '150px' }} key={f.randId}>
            <div className="h-full border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div>
                <Link href={`/flashcard/${f.randId}`}>
                  <a title={f.title} className="text-gray-900 font-bold text-xl mb-2 line-clamp-1">
                    {f.title}
                  </a>
                </Link>
                <div className="py-2">
                  {
                    f.tags.map(t => (
                      <span
                        key={t.id}
                        onClick={() => handleTagClick(t.name)}
                        className="cursor-pointer inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      >
                        #{t.name}
                      </span>
                    ))
                  }
                </div>
              </div>
              <div className="flex items-center">
                <Link href={`/profile/${f.creator.username}`}>
                  <a>
                    <img className="w-10 h-10 rounded-full mr-4" src={f.creator.profilePic} alt="Avatar of Writer" />
                  </a>
                </Link>
                <div className="text-sm">
                  <Link href={`/profile/${f.creator.username}`}>
                    <a>
                      <p className="text-gray-900 leading-none line-clamp-1">{f.creator.name}</p>
                    </a>
                  </Link>
                  <p className="text-gray-600">{timeAgo.format(f.createdAt)}</p>
                </div>
              </div>
            </div>


            {/* <Link href={`/flashcard/${f.randId}`}>
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
            <hr /> */}
          </div>
        ))
      }
    </InfiniteScroll>
  )
}

export default FlashcardsList