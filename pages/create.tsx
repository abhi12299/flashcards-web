import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Mention } from "primereact/mention";
import React, { useEffect, useRef, useState } from 'react';
import FormikErrorText from "../components/FormikErrorText";
import Layout from '../components/Layout';
import { Difficulty, useCreateFlashcardMutation, useMyTopTagsQuery, useSearchTagsQuery } from '../generated/graphql';
import { removeSpecialChars } from "../utils/removeSpecialChars";
import { toTitleCase } from "../utils/toTitleCase";
import { withApollo } from '../utils/withApollo';

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

const CreateFlashcard: React.FC = () => {
  const router = useRouter()
  const difficultyValues: Difficulty[] = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard]
  const tagInputRef = useRef<HTMLInputElement>(null)
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([])

  const [createFlashcard, { loading }] = useCreateFlashcardMutation();
  const { refetch: searchTags, loading: searching } = useSearchTagsQuery({
    fetchPolicy: 'network-only',
    skip: true
  })
  const { data: myTopTags } = useMyTopTagsQuery()

  useEffect(() => {
    if (tagInputRef.current) {
      tagInputRef.current.setAttribute('placeholder', 'Type # to find relevant tags')
      tagInputRef.current.setAttribute('rows', '2')
    }
  }, [])

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    setFieldValue,
    validateForm
  } = useFormik({
    initialValues: {
      title: '',
      body: '',
      difficulty: Difficulty.Easy,
      isPublic: 'true',
      tags: []
    },
    async onSubmit({ title, body, difficulty, isPublic }) {
      if (loading) return
      const tags = getTagsFromInputRef()
      if (!tags) return

      const { errors, data } = await createFlashcard({
        variables: {
          body,
          title,
          difficulty,
          isPublic: isPublic === 'true',
          tags
        },
        update(cache) {
          // TODO: update cache to add flashcard
          cache.evict({ fieldName: 'flashcardsFeed' })
        }
      })
      if (errors || !data) {
        console.error('something went wrong!')
        return
      }
      if (data.createFlashcard.errors) {
        console.error(data?.createFlashcard.errors[0].message)
        return
      }
      router.push('/feed')
    },
    validate({ title, body }) {
      const errors: Record<string, any> = {}
      if (title.length < 5) {
        errors.title = 'Title is too short!'
      }
      if (body.length < 1) {
        errors.body = 'Body is too short!'
      }
      if (tagInputRef.current) {
        const inpTags = getTagsFromInputRef()
        if (inpTags!.length === 0) {
          errors.tags = 'You must add at least 1 tag.'
        }
        if (inpTags!.length > 5) {
          errors.tags = 'You cannot add more than 5 tags.'
        }
        if (inpTags!.find(t => t.length > 20)) {
          errors.tags = 'Tags can have a maximum of 20 characters.'
        }
      }
      return errors
    }
  })


  const getTagsFromInputRef = () => {
    if (tagInputRef.current) {
      return Array.from(
        new Set(
          tagInputRef.current.value
            .split('#')
            .map(t => t.trim().replace(/ /g, ''))
            .map(t => removeSpecialChars(t))
            .filter(t => t)
        )
      )
    }
  }
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

  return (
    <>
      <Head>
        <title>New Flashcard</title>
        <meta name="description" content="A community driven, open source flashcard website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container max-w-6xl mx-auto px-5 sm:px-6 pt-20 md:pt-30">
          <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <input
                className="text-2xl font-bold w-2/4 py-2 border-b-2 border-gray-400 focus:border-gray-600 placeholder-gray-400 outline-none"
                name="title"
                type="text"
                autoComplete="off"
                placeholder="Title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              >
              </input>
              {errors.title && <FormikErrorText>{errors.title}</FormikErrorText>}
            </div>
            <div className="form-group mt-4">
              <h5 className="h5 font-semibold">What do you want to remember?</h5>
              <MDEditor
                className="my-2"
                value={values.body}
                onChange={(value) => setFieldValue('body', value)}
              />
              {errors.body && <FormikErrorText>{errors.body}</FormikErrorText>}
            </div>
            <div className="form-group mt-4">
              <h5 className="h5 font-semibold">
                Assign some tags
              </h5>
              <Mention
                suggestions={tagSuggestions}
                inputRef={tagInputRef}
                onBlur={() => validateForm()}
                onSearch={(e) => handleSearchTags(e.query)}
                delay={500}
                trigger="#"
                inputClassName="w-full resize-none"
                className="my-2 w-2/4"
              />
              {errors.tags && <FormikErrorText>{errors.tags}</FormikErrorText>}
            </div>
            <div className="form-group mt-4 flex flex-col">
              <h5 className="h5 font-semibold">
                Difficulty
              </h5>
              <div className="mt-2 flex flex-col">
                {
                  difficultyValues.map(d => (
                    <label key={d} className="inline-flex items-center">
                      <input
                        value={d}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.difficulty === d}
                        style={{ borderRadius: '50%' }}
                        className="form-radio w-5 h-5"
                        type="radio"
                        name="difficulty"
                      >
                      </input>
                      <span className="ml-2 text-gray-700">{toTitleCase(d)}</span>
                    </label>
                  ))
                }
              </div>
            </div>
            <div className="form-group mt-4 flex-col">
              <h5 className="h5 font-semibold">
                Visibility
              </h5>
              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    value={'true'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.isPublic === 'true'}
                    style={{ borderRadius: '50%' }}
                    className="form-radio w-5 h-5"
                    type="radio"
                    name="isPublic"
                  >
                  </input>
                  <span className="ml-2 text-gray-700">Public</span>
                </label>
                <label className="flex items-center">
                  <input
                    value={'false'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.isPublic === 'false'}
                    style={{ borderRadius: '50%' }}
                    className="form-radio w-5 h-5"
                    type="radio"
                    name="isPublic"
                  >
                  </input>
                  <span className="ml-2 text-gray-700">Private</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="my-4 outline-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Save
            </button>
          </form>
        </div>
      </Layout>
    </>
  )
}

export default withApollo({ ssr: false })(CreateFlashcard)
