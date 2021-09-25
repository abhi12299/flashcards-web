import { useApolloClient } from '@apollo/client'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Dropdown } from 'primereact/dropdown'
import { Mention } from 'primereact/mention'
import React, { useEffect, useRef, useState } from 'react'
import Fab from '../components/Fab'
import FlashcardsList from '../components/FlashcardsList'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import { Difficulty, useFlashcardsFeedLazyQuery, useForkFlashcardMutation, useMyTopTagsQuery, useSearchTagsQuery } from '../generated/graphql'
import { useIsAuthRequired } from '../hooks/useIsAuthRequired'
import { removeSpecialChars } from '../utils/removeSpecialChars'
import { withApollo } from '../utils/withApollo'

const Home: React.FC = () => {
  const { query, isReady, push, replace } = useRouter()
  const [tags, setTags] = useState<string[]>([])
  const [searchFlashcardInputValue, setSearchFlashcardInputValue] = useState('')
  const [searchFlashcardTerm, setSearchFlashcardTerm] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>()
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([])
  const tagSearchInputRef = useRef<HTMLInputElement>(null)
  const { data: userData, loading: authChecking } = useIsAuthRequired()
  const apolloClient = useApolloClient()
  const [forkFlashcard, { loading: forking }] = useForkFlashcardMutation()
  const [getFlashcardsFeed, { data, error, loading: fetching, fetchMore, variables: flashcardsFeedVariables, refetch: flashcardsFeedRefetch }] = useFlashcardsFeedLazyQuery()
  const { refetch: searchTags, loading: searching } = useSearchTagsQuery({
    fetchPolicy: 'network-only',
    skip: true
  })
  const { data: myTopTags } = useMyTopTagsQuery()

  const handleSearchTags = async (term: string) => {
    if (searching) return
    if (!term && myTopTags?.myTopTags) {
      setTagSuggestions(myTopTags.myTopTags.map(t => t.name))
    }
    if (term && searchTags) {
      try {
        const { data } = await searchTags({ term })
        setTagSuggestions(data.searchTags.map(t => t.name))
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (tagSearchInputRef.current) {
      tagSearchInputRef.current.setAttribute('rows', '1')
      tagSearchInputRef.current.setAttribute('placeholder', 'Type # to filter by tags')
    }
  }, [tagSearchInputRef])

  useEffect(() => {
    if (myTopTags?.myTopTags) {
      setTagSuggestions(myTopTags.myTopTags.map(t => t.name))
    }
  }, [myTopTags])

  useEffect(() => {
    if (!isReady) return

    let { tags, difficulty, q } = query
    if (typeof tags === 'string') {
      tags = tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
    } else {
      tags = []
    }
    setTags(tags)
    if (tagSearchInputRef.current && tags.length > 0) {
      tagSearchInputRef.current.value = `${tags.map(t => `#${t}`).join(' ')} `
    }

    if (typeof difficulty === 'string') {
      switch (difficulty.toLowerCase()) {
        case 'easy':
          setDifficulty(Difficulty.Easy)
          break
        case 'medium':
          setDifficulty(Difficulty.Medium)
          break
        case 'hard':
          setDifficulty(Difficulty.Hard)
          break
      }
    }
    if (typeof q === 'string') {
      // remove special chars
      setSearchFlashcardInputValue(removeSpecialChars(q))
      setSearchFlashcardTerm(removeSpecialChars(q))
    }
  }, [isReady, query])

  useEffect(() => {
    if (!isReady || authChecking || fetching || !userData?.user || error) return
    getFlashcardsFeed({
      variables: {
        limit: 12,
        tags: tags.length > 0 ? tags : undefined,
        difficulty: difficulty || undefined,
        searchTerm: searchFlashcardTerm
      }
    })
  }, [error, query, fetching, getFlashcardsFeed, isReady, searchFlashcardTerm, tags, difficulty, authChecking, userData])

  const updateTagsQueryParams = (tags: string[]) => {
    if (tags.length > 0) {
      // update query param
      replace({
        query: {
          ...query,
          tags: `${tags.join(',')}`
        }
      })
    } else {
      delete query.tags
      replace({
        query: {
          ...query
        }
      })
    }
  }

  const updateDifficultyQueryParam = (difficulty?: Difficulty) => {
    if (!difficulty) {
      const queryWithoutDifficulty = query
      delete queryWithoutDifficulty.difficulty
      replace({
        query: queryWithoutDifficulty
      })
      return
    }
    replace({
      query: {
        ...query,
        difficulty: difficulty.toLowerCase()
      }
    })
  }

  const updateSearchFlashcardQueryParam = (term?: string) => {
    if (!term) {
      const queryWithoutText = query
      delete queryWithoutText.q
      replace({
        query: queryWithoutText
      })
      return
    }
    replace({
      query: {
        ...query,
        q: term
      }
    })
  }

  const handleFork = async (randId: string) => {
    if (forking) return
    const { errors, data } = await forkFlashcard({
      variables: {
        randId
      },
      // update(cache) {
      //   //  TODO: update cache somehow to set isForkedByYou true
      // }
    })
    if (data?.forkFlashcard.forkedId) {
      await push(`/flashcard/${data.forkFlashcard.forkedId}`)
      // FIXME: remove this later
      apolloClient.cache.evict({ fieldName: 'flashcardsFeed' })
    } else {
      console.error('cannot fork!', errors, data)
    }
  }

  const updateTagFilter = () => {
    if (!tagSearchInputRef.current) return
    // dedup and remove empty tags
    let inputTags = tagSearchInputRef.current.value.split('#').map(t => t.trim()).filter(t => t)
    inputTags = Array.from(new Set(inputTags))
    if (inputTags.length > 0) {
      setTags(inputTags)
      updateTagsQueryParams(inputTags)
    } else {
      setTags([])
      updateTagsQueryParams([])
    }
  }

  const clearTagFilter = () => {
    setTags([])
    updateTagsQueryParams([])
    if (tagSearchInputRef.current) {
      tagSearchInputRef.current.value = ''
    }
  }

  const handleSearchFlashcards = () => {
    updateSearchFlashcardQueryParam(searchFlashcardInputValue)
    setSearchFlashcardTerm(searchFlashcardInputValue)
  }

  const handleClearSearch = () => {
    updateSearchFlashcardQueryParam('')
    setSearchFlashcardTerm('')
    setSearchFlashcardInputValue('')
  }

  let pageContent: JSX.Element | null = null

  if (error) {
    pageContent = (
      <div className="my-10 text-red-600">
        Something went wrong. Please try again later.
      </div>
    )
  } else if (fetching || !isReady) {
    pageContent = (
      <div style={{ maxWidth: '80px' }} className="text-center my-10 mx-auto">
        <Spinner />
      </div>
    )
  } else if (!data || data.flashcardsFeed.flashcards.length === 0) {
    pageContent = (
      <div className="my-10">
        <h4 className="h4 text-gray-800">
          No flashcards found!
        </h4>
      </div>
    )
  } else {
    pageContent = (
      <div className="my-10">
        <FlashcardsList
          hasMore={data.flashcardsFeed.hasMore}
          fetchMore={async () => {
            if (!fetchMore) return
            const { flashcards } = data.flashcardsFeed
            fetchMore({
              variables: {
                limit: 12,
                cursor: flashcards[flashcards.length - 1].createdAt
              }
            })
          }}
          flashcards={data.flashcardsFeed.flashcards}
          userData={userData}
          handleFork={handleFork}
        />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Flashcards</title>
        <meta name="description" content="A community driven, open source flashcard website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container max-w-6xl mx-auto px-5 sm:px-6 pt-20 md:pt-30">
          <section>
            <h1 className="text-2xl md:text-4xl font-extrabold leading-tighter tracking-tighter mb-4">
              Your Feed
            </h1>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
              {/* search section */}
              <div className="col-span-2">
                <div className="w-4/5 h-10 relative text-gray-600">
                  <input
                    value={searchFlashcardInputValue}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleSearchFlashcards()
                      }
                    }}
                    onChange={e => setSearchFlashcardInputValue(removeSpecialChars(e.target.value))}
                    style={{ border: '1px solid #ced4da' }}
                    className="border-2 h-full w-full bg-white px-4 pr-10 rounded text-sm focus:outline-none"
                    type="text"
                    placeholder="Search for anything"
                  />
                  <button className="absolute w-10 h-10 right-7 top-0" onClick={() => {
                    handleClearSearch()
                  }}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <button className="absolute w-10 h-10 right-0 top-0" onClick={() => {
                    handleSearchFlashcards()
                  }}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
              {/* tags filter */}
              <div className="flex flex-row md:justify-end col-span-2">
                <Mention
                  suggestions={tagSuggestions}
                  inputRef={tagSearchInputRef}
                  onSearch={(e) => handleSearchTags(e.query)}
                  delay={500}
                  trigger="#"
                  inputClassName="w-full resize-none"
                  className="w-2/4"
                />
                {
                  tags.length > 0 &&
                  <button onClick={() => clearTagFilter()} className="ml-2 outline-none bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                }
                <button className="ml-2 outline-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => updateTagFilter()}>
                  Filter
                </button>
              </div>
              {/* difficulty dropdown */}
              <div className="col-span-1">
                <Dropdown
                  className="w-full"
                  placeholder="Select Difficulty (all)"
                  value={difficulty || ''}
                  options={[
                    { label: 'All', value: '' },
                    { label: 'Easy', value: Difficulty.Easy },
                    { label: 'Medium', value: Difficulty.Medium },
                    { label: 'Hard', value: Difficulty.Hard },
                  ]}
                  onChange={e => {
                    if (!e.value) {
                      setDifficulty(undefined)
                      updateDifficultyQueryParam()
                    } else {
                      setDifficulty(e.value)
                      updateDifficultyQueryParam(e.value)
                    }
                  }}
                />
              </div>
            </div>
          </section>
          {
            authChecking ?
              null
              :
              pageContent
          }
        </div>
        {userData?.user && <Fab />}
      </Layout>
    </>
  )
}

export default withApollo({ ssr: false })(Home)
