import { useApolloClient } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Dropdown } from 'primereact/dropdown'
import { Mention } from 'primereact/mention'
import React, { useEffect, useRef, useState } from 'react'
import FlashcardsList from '../components/FlashcardsList'
import Layout from '../components/Layout'
import { Difficulty, useFlashcardsFeedLazyQuery, useForkFlashcardMutation, useMyTopTagsQuery, useSearchTagsQuery } from '../generated/graphql'
import { useIsAuthRequired } from '../hooks/useIsAuthRequired'
import { withApollo } from '../utils/withApollo'

const Home: React.FC = () => {
  const { query, isReady, push, replace } = useRouter()
  const [tags, setTags] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<Difficulty>()
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([])
  const tagSearchInputRef = useRef<HTMLInputElement>(null)
  const { data: userData, loading: authChecking } = useIsAuthRequired()
  const apolloClient = useApolloClient()
  const [forkFlashcard, { loading: forking }] = useForkFlashcardMutation()
  const [getFlashcardsFeed, { data, error, loading: fetching, fetchMore }] = useFlashcardsFeedLazyQuery()
  const { refetch, loading: searching } = useSearchTagsQuery({
    fetchPolicy: 'network-only',
    skip: true
  })
  const { data: myTopTags } = useMyTopTagsQuery()

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

  const handleSearchTags = async (term: string) => {
    if (searching) return
    if (!term && myTopTags?.myTopTags) {
      setTagSuggestions(myTopTags.myTopTags.map(t => t.name))
    }
    if (term && refetch) {
      try {
        const { data } = await refetch({ term })
        setTagSuggestions(data.searchTags.map(t => t.name))
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (!isReady) return

    let { tags, difficulty } = query
    if (typeof tags === 'string') {
      tags = tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
    } else {
      tags = []
    }
    setTags(tags)
    if (tagSearchInputRef.current && tags.length > 0) {
      console.log('setting initial value in tag filter')
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
    } else {
      delete query.tags
      replace({
        query: {
          ...query
        }
      })
    }
  }, [tags])

  useEffect(() => {
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
  }, [difficulty])

  useEffect(() => {
    if (!isReady || authChecking || fetching || !userData?.user || error) return
    getFlashcardsFeed({
      variables: {
        limit: 10,
        tags: tags.length > 0 ? tags : undefined,
        difficulty: difficulty || undefined
      }
    })
  }, [error, fetching, getFlashcardsFeed, isReady, tags, difficulty, authChecking, userData])

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
    } else {
      setTags([])
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
    pageContent = (
      <>
        Showing {data.flashcardsFeed.flashcards.length} of {data.flashcardsFeed.total}
        <FlashcardsList
          hasMore={data.flashcardsFeed.hasMore}
          fetchMore={async () => {
            if (!fetchMore) return
            const { flashcards } = data.flashcardsFeed
            fetchMore({
              variables: {
                limit: 10,
                cursor: flashcards[flashcards.length - 1].createdAt
              }
            })
          }}
          flashcards={data.flashcardsFeed.flashcards}
          userData={userData}
          handleFork={handleFork}
        />
      </>
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
            <div className="grid grid-cols-3 gap-4">
              {/* difficulty dropdown */}
              <div className="col-span-1">
                <Dropdown
                  className="w-full"
                  placeholder="Select Difficulty (all)"
                  value={difficulty || ''}
                  options={[
                    { label: 'Select Difficulty (all)', value: '' },
                    { label: 'Easy', value: Difficulty.Easy },
                    { label: 'Medium', value: Difficulty.Medium },
                    { label: 'Hard', value: Difficulty.Hard },
                  ]}
                  onChange={e => {
                    if (!e.value) {
                      setDifficulty(undefined)
                    } else {
                      setDifficulty(e.value)
                    }
                  }}
                />
              </div>
              {/* tags filter */}
              <div className="text-right col-span-2">
                <Mention
                  suggestions={tagSuggestions}
                  inputRef={tagSearchInputRef}
                  onSearch={(e) => handleSearchTags(e.query)}
                  delay={500}
                  trigger="#"
                  inputClassName="w-full resize-none"
                  className="w-2/4"
                />
                <button className="ml-2 outline-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => updateTagFilter()}>
                  Filter
                </button>
              </div>
              {/* search section */}
              <div className="col-span-2">Search section</div>
            </div>
          </section>
          {
            authChecking ?
              null
              :
              pageContent
          }
        </div>
      </Layout>
    </>
  )
}

export default withApollo({ ssr: false })(Home)
