import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Difficulty, useCreateFlashcardMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const CreateFlashcard: React.FC = () => {
  const [tags, setTags] = useState<string[]>([])
  const router = useRouter()
  const difficultyValues: Difficulty[] = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard]

  const [createFlashcard, { loading }] = useCreateFlashcardMutation();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors
  } = useFormik({
    initialValues: {
      title: '',
      body: '',
      difficulty: Difficulty.Easy,
      isPublic: true
    },
    async onSubmit({ title, body, difficulty, isPublic }) {
      if (loading) return
      const { errors, data } = await createFlashcard({
        variables: {
          body,
          title,
          difficulty,
          isPublic,
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
      router.push('/')
    },
    validate({ title, body }) {
      const errors: Record<string, any> = {}
      if (title.length < 5) {
        errors.title = 'Title is too short!'
      }
      if (body.length < 1) {
        errors.body = 'Body is too short!'
      }
      return errors
    }
  })

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        >
        </input>
        {errors.title && <p>{errors.title}</p>}
        <br />
        <textarea
          name="body"
          placeholder="Write something you want to remember..."
          value={values.body}
          onChange={handleChange}
          onBlur={handleBlur}
        >
        </textarea>
        {errors.body && <p>{errors.body}</p>}
        <br />
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
            onChange={handleChange}
            onBlur={handleBlur}
            checked={values.isPublic}
          >
          </input>
        </label>
        <button type="submit">Create Flashcard</button>
      </form>
    </div>
  )
}

export default withApollo({ ssr: false })(CreateFlashcard)
