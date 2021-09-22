import { faCodeBranch, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TimeAgo from 'javascript-time-ago';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Difficulty, FlashcardsFeedQuery, UserFlashcardsQuery, UserQuery } from '../generated/graphql';
import { toTitleCase } from '../utils/toTitleCase';
import Spinner from './Spinner';

const timeAgo = new TimeAgo('en-US')

const FlashcardsList: React.FC<{
  hasMore: boolean;
  fetchMore: () => Promise<void>;
  flashcards: UserFlashcardsQuery['userFlashcards']['flashcards'] | FlashcardsFeedQuery['flashcardsFeed']['flashcards'];
  userData?: UserQuery;
  handleFork: (randId: string) => Promise<any>;
}> = ({ flashcards, fetchMore, hasMore, userData, handleFork }) => {
  const { push, query } = useRouter()

  const handleTagClick = (tag: string) => {
    push({
      query: {
        ...query,
        tags: tag
      },
    }, undefined, { shallow: true })
  }

  const handleDifficultyClick = (diff: Difficulty) => {
    push({
      query: {
        ...query,
        difficulty: diff
      },
    }, undefined, { shallow: true })
  }

  const handleEditClick = (id: string) => {
    push(`/flashcard/edit/${id}`)
  }

  return (
    <InfiniteScroll
      dataLength={flashcards.length}
      next={() => {
        if (!fetchMore) return
        fetchMore()
      }}
      className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 grid-cols-1"
      hasMore={hasMore}
      loader={
        <div className="text-center col-span-full w-1/4 h-1/4 mx-auto">
          <Spinner />
        </div>
      }
    >
      {
        flashcards.map(f => (
          <div className="col-span-1" style={{ minHeight: '150px', height: 'fit-content' }} key={f.randId}>
            <div className="h-full border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div>
                {
                  f.creator.username === userData?.user?.username &&
                  <p className="float-right flex flex-row cursor-pointer w-6 h-6" onClick={() => handleEditClick(f.randId)}>
                    <FontAwesomeIcon className="w-full h-full" icon={faEdit} />
                  </p>
                }
                {
                  userData?.user && f.creator.username !== userData.user.username &&
                  !f.isForkedByYou &&
                  <p className="float-right flex flex-row w-6 h-6 cursor-pointer" onClick={() => handleFork(f.randId)}>
                    <FontAwesomeIcon title="Fork" className="w-full h-full" icon={faCodeBranch} />
                  </p>
                }
                <Link href={`/flashcard/${f.randId}`}>
                  <a title={f.title} className="text-gray-900 font-bold md:text-xl text-md mb-2 line-clamp-1">
                    {f.title}
                  </a>
                </Link>
                <div className="py-2">
                  {
                    f.tags.map(t => (
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
                <div className="pb-2 inline-block cursor-pointer" onClick={() => handleDifficultyClick(f.difficulty)}>
                  <span className={`rounded-full mr-1 w-10 h-10 border-solid border-4 ${f.difficulty === Difficulty.Easy ? 'border-green-600' : ''} ${f.difficulty === Difficulty.Medium ? 'border-yellow-600' : ''} ${f.difficulty === Difficulty.Hard ? 'border-red-600' : ''}`}></span>
                  {toTitleCase(f.difficulty)}
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
                      <p className="leading-none line-clamp-1">{f.creator.name}</p>
                    </a>
                  </Link>
                  <p className="text-gray-600">{timeAgo.format(f.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </InfiniteScroll>
  )
}

export default FlashcardsList