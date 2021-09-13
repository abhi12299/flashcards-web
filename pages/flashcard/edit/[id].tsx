import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Difficulty, FlashcardDocument, useDeleteFlashcardMutation, useFlashcardLazyQuery, useUpdateFlashcardMutation } from '../../../generated/graphql'
import { useIsAuthRequired } from '../../../hooks/useIsAuthRequired'
import { withApollo } from '../../../utils/withApollo'

const FlashcardPage: React.FC = () => {
  const { query: { id }, push, back } = useRouter()
  const { loading: authChecking, data: meData } = useIsAuthRequired()
  const [tags, setTags] = useState<string[]>([])
  const difficultyValues: Difficulty[] = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard]

  const [getFlashcard, { loading, error, data }] = useFlashcardLazyQuery()
  const [deleteFlashcard, { loading: deleting }] = useDeleteFlashcardMutation()
  const [updateFlashcard, { loading: updating }] = useUpdateFlashcardMutation({
    refetchQueries: [
      {
        query: FlashcardDocument,
        variables: {
          randId: id
        }
      }
    ]
  })

  const handleDelete = async () => {
    if (deleting || !window.confirm('Are you sure?')) return
    const { data, errors } = await deleteFlashcard({
      variables: {
        randId: id as string
      },
      update(cache) {
        cache.evict({
          fieldName: 'flashcard',
          args: { randId: id }
        })
        cache.evict({
          fieldName: 'flashcardsFeed'
        })
      }
    })
    if (errors || !data) {
      console.error(errors)
      return
    }
    // maybe go to feed?
    push(`/feed`)
  }

  useEffect(() => {
    if (data?.flashcard) {
      setTags(data.flashcard.tags.map((t) => t.name))
    }
  }, [data])

  useEffect(() => {
    if (typeof id === 'string' && !loading) {
      getFlashcard({ variables: { randId: id } })
    }
  }, [id, getFlashcard, loading])

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

  if (data.flashcard.creator.username !== meData?.me?.username) {
    // TODO: re-route to error page?
    return (
      <div>
        Not authorized to view the page!
      </div>
    )
  }
  return (
    <div>
      <h3>Edit flashcard</h3>
      <Formik
        initialValues={{
          title: data.flashcard.title,
          difficulty: data.flashcard.difficulty,
          body: data.flashcard.body,
          isPublic: data.flashcard.isPublic
        }}
        validate={({ title, body }) => {
          const errors: Record<string, any> = {}
          if (title.length < 5) {
            errors.title = 'Title is too short!'
          }
          if (body.length < 1) {
            errors.body = 'Body is too short!'
          }
          return errors
        }}
        onSubmit={async (values) => {
          if (updating) return

          const { data, errors } = await updateFlashcard({
            variables: {
              randId: id as string,
              title: values.title,
              body: values.body,
              difficulty: values.difficulty,
              isPublic: values.isPublic,
              tags: tags.filter(t => t.trim().length > 0)
            },
            update(cache) {
              // TODO: just update in the cache
              cache.evict({ fieldName: 'flashcardsFeed' })
            }
          })
          if (errors || !data || data.updateFlashcard.errors) {
            window.alert('something went wrong!')
            return
          }
          // go back to flashcard page
          push(`/flashcard/${id}`)
        }}
      >
        {({ handleChange, handleBlur, values, errors }) => {
          return (
            <Form>
              <label>Title</label>
              <input
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.title && <p>{errors.title}</p>}
              <br />
              <label>Body</label>
              <textarea
                name="body"
                value={values.body}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.body && <p>{errors.body}</p>}
              {/* use https://primefaces.org/primereact/showcase/#/mention */}
              <input
                placeholder="Add some tags..."
                type="text"
                onChange={(e) => {
                  if (!e.target.value) {
                    setTags([])
                    return
                  }
                  setTags(e.target.value.split(',').map(t => t.trim().toLowerCase()))
                }}
                value={tags.join(', ')}
              >
              </input>
              {tags.length === 0 && <p>Add atleast 1 tag!</p>}
              {
                difficultyValues.map(d => (
                  <div key={d}>
                    <label>
                      {d}
                      <input
                        value={d}
                        type="radio"
                        name="difficulty"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.difficulty === d}
                      ></input>
                    </label>
                  </div>
                ))
              }
              <label>
                Is Public?
                <input
                  type="checkbox"
                  name="isPublic"
                  disabled={data.flashcard?.isFork}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.isPublic}
                >
                </input>
              </label>
              <button type="submit" disabled={updating}>Edit</button>
            </Form>
          )
        }}
      </Formik>
      <button disabled={deleting} onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default withApollo({ ssr: false })(FlashcardPage)
