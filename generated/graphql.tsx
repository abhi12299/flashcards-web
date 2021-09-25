import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CreateFlashcardInput = {
  title: Scalars['String'];
  body: Scalars['String'];
  tags: Array<Scalars['String']>;
  difficulty: Difficulty;
  isPublic: Scalars['Boolean'];
};

export type CreateFlashcardResponse = {
  __typename?: 'CreateFlashcardResponse';
  flashcard?: Maybe<Flashcard>;
  errors?: Maybe<Array<FieldError>>;
};


/** Difficulty of flashcard */
export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Flashcard = {
  __typename?: 'Flashcard';
  randId: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['String'];
  isPublic: Scalars['Boolean'];
  isFork: Scalars['Boolean'];
  difficulty: Difficulty;
  tags: Array<Tag>;
  creator: User;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  status: FlashcardVisibility;
  isForkedByYou: Scalars['Boolean'];
  stats?: Maybe<FlashcardStats>;
};

export type FlashcardHistory = {
  __typename?: 'FlashcardHistory';
  id: Scalars['Float'];
  flashcardId: Scalars['Float'];
  userId: Scalars['Float'];
  status: FlashcardStatus;
  responseDuration: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  flashcard: Flashcard;
};

export type FlashcardReportByDifficulty = {
  __typename?: 'FlashcardReportByDifficulty';
  easy?: Maybe<Scalars['Float']>;
  medium?: Maybe<Scalars['Float']>;
  hard?: Maybe<Scalars['Float']>;
};

export type FlashcardReportByStatus = {
  __typename?: 'FlashcardReportByStatus';
  knowAnswer?: Maybe<Scalars['Float']>;
  dontKnowAnswer?: Maybe<Scalars['Float']>;
  unattempted?: Maybe<Scalars['Float']>;
};

export type FlashcardReportInput = {
  timespan: ReportTimespan;
  groupBy: ReportGroupBy;
};

export type FlashcardReportResponse = {
  __typename?: 'FlashcardReportResponse';
  byDifficulty?: Maybe<FlashcardReportByDifficulty>;
  byStatus?: Maybe<FlashcardReportByStatus>;
};

export type FlashcardStats = {
  __typename?: 'FlashcardStats';
  avgTime: Scalars['Float'];
  numAttempts: Scalars['Float'];
  lastSeenOn: Scalars['Float'];
};

/** User's status for a flashcard */
export enum FlashcardStatus {
  Unattempted = 'unattempted',
  KnowAnswer = 'knowAnswer',
  DontKnowAnswer = 'dontKnowAnswer'
}

/** Visibility of a flashcard (public/private/deleted etc) */
export enum FlashcardVisibility {
  Public = 'public',
  Private = 'private',
  Deleted = 'deleted'
}

export type ForkFlashcardResponse = {
  __typename?: 'ForkFlashcardResponse';
  errors?: Maybe<Array<FieldError>>;
  forkedId?: Maybe<Scalars['String']>;
};

export type GetFlashcardsHistoryInput = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
};

export type GetFlashcardsInput = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['Float']>;
  tags?: Maybe<Array<Scalars['String']>>;
  difficulty?: Maybe<Difficulty>;
  username?: Maybe<Scalars['String']>;
  searchTerm?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFlashcard: CreateFlashcardResponse;
  updateFlashcard: UpdateFlashcardResponse;
  deleteFlashcard: Scalars['Boolean'];
  forkFlashcard: ForkFlashcardResponse;
  respondToFlashcard: RespondToFlashcardResponse;
  login: UserResponse;
  updateUser?: Maybe<User>;
};


export type MutationCreateFlashcardArgs = {
  input: CreateFlashcardInput;
};


export type MutationUpdateFlashcardArgs = {
  input: UpdateFlashcardInput;
};


export type MutationDeleteFlashcardArgs = {
  randId: Scalars['String'];
};


export type MutationForkFlashcardArgs = {
  from: Scalars['String'];
};


export type MutationRespondToFlashcardArgs = {
  input: RespondToFlashcardInput;
};


export type MutationLoginArgs = {
  name: Scalars['String'];
  idToken: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserProfileInput;
};

export type PaginatedFlashcards = {
  __typename?: 'PaginatedFlashcards';
  flashcards: Array<Flashcard>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedFlashcardsHistory = {
  __typename?: 'PaginatedFlashcardsHistory';
  flashcardHistory: Array<FlashcardHistory>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  flashcardsFeed: PaginatedFlashcards;
  userFlashcards: PaginatedFlashcards;
  flashcard?: Maybe<Flashcard>;
  flashcardsReport: FlashcardReportResponse;
  flashcardHistory: PaginatedFlashcardsHistory;
  hello: Scalars['String'];
  myTopTags: Array<Tag>;
  topTags: Array<Tag>;
  searchTags: Array<Tag>;
  user?: Maybe<User>;
};


export type QueryFlashcardsFeedArgs = {
  input: GetFlashcardsInput;
};


export type QueryUserFlashcardsArgs = {
  input: GetFlashcardsInput;
};


export type QueryFlashcardArgs = {
  randId: Scalars['String'];
};


export type QueryFlashcardsReportArgs = {
  input: FlashcardReportInput;
};


export type QueryFlashcardHistoryArgs = {
  input: GetFlashcardsHistoryInput;
};


export type QuerySearchTagsArgs = {
  input: SearchTagsInput;
};


export type QueryUserArgs = {
  input: UserProfileInput;
};

/** Groups to be formed in reports */
export enum ReportGroupBy {
  Difficulty = 'difficulty',
  AnswerStatus = 'answerStatus'
}

/** Duration to be captured in reporting */
export enum ReportTimespan {
  Week = 'week',
  Month = 'month'
}

export type RespondToFlashcardInput = {
  randId: Scalars['String'];
  type: FlashcardStatus;
  duration?: Maybe<Scalars['Float']>;
};

export type RespondToFlashcardResponse = {
  __typename?: 'RespondToFlashcardResponse';
  errors?: Maybe<Array<FieldError>>;
  done: Scalars['Boolean'];
};

export type SearchTagsInput = {
  term: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float'];
  name: Scalars['String'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type UpdateFlashcardInput = {
  randId: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  isPublic?: Maybe<Scalars['Boolean']>;
  difficulty?: Maybe<Difficulty>;
};

export type UpdateFlashcardResponse = {
  __typename?: 'UpdateFlashcardResponse';
  errors?: Maybe<Array<FieldError>>;
  flashcard?: Maybe<Flashcard>;
};

export type UpdateUserProfileInput = {
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  name: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  numFlashcards: Scalars['Int'];
};

export type UserProfileInput = {
  username?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  isNewUser?: Maybe<Scalars['Boolean']>;
  accessToken?: Maybe<Scalars['String']>;
};

export type FlashcardMinimalFragment = (
  { __typename?: 'Flashcard' }
  & Pick<Flashcard, 'randId' | 'isFork' | 'isForkedByYou' | 'title' | 'body' | 'difficulty' | 'createdAt' | 'isPublic'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'username' | 'name'>
  ), tags: Array<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'name'>
  )> }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'username' | 'name' | 'email'>
);

export type CreateFlashcardMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
  tags: Array<Scalars['String']> | Scalars['String'];
  difficulty: Difficulty;
  isPublic: Scalars['Boolean'];
}>;


export type CreateFlashcardMutation = (
  { __typename?: 'Mutation' }
  & { createFlashcard: (
    { __typename?: 'CreateFlashcardResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, flashcard?: Maybe<(
      { __typename?: 'Flashcard' }
      & Pick<Flashcard, 'randId'>
    )> }
  ) }
);

export type DeleteFlashcardMutationVariables = Exact<{
  randId: Scalars['String'];
}>;


export type DeleteFlashcardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFlashcard'>
);

export type ForkFlashcardMutationVariables = Exact<{
  randId: Scalars['String'];
}>;


export type ForkFlashcardMutation = (
  { __typename?: 'Mutation' }
  & { forkFlashcard: (
    { __typename?: 'ForkFlashcardResponse' }
    & Pick<ForkFlashcardResponse, 'forkedId'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  idToken: Scalars['String'];
  name: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'isNewUser' | 'accessToken'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>> }
  ) }
);

export type RespondToFlashcardMutationVariables = Exact<{
  randId: Scalars['String'];
  type: FlashcardStatus;
  duration?: Maybe<Scalars['Float']>;
}>;


export type RespondToFlashcardMutation = (
  { __typename?: 'Mutation' }
  & { respondToFlashcard: (
    { __typename?: 'RespondToFlashcardResponse' }
    & Pick<RespondToFlashcardResponse, 'done'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>> }
  ) }
);

export type UpdateFlashcardMutationVariables = Exact<{
  randId: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  difficulty?: Maybe<Difficulty>;
}>;


export type UpdateFlashcardMutation = (
  { __typename?: 'Mutation' }
  & { updateFlashcard: (
    { __typename?: 'UpdateFlashcardResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>> }
  ) }
);

export type FlashcardQueryVariables = Exact<{
  randId: Scalars['String'];
}>;


export type FlashcardQuery = (
  { __typename?: 'Query' }
  & { flashcard?: Maybe<(
    { __typename?: 'Flashcard' }
    & Pick<Flashcard, 'randId' | 'title' | 'body' | 'createdAt' | 'isPublic' | 'isForkedByYou' | 'isFork' | 'difficulty' | 'status'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name'>
    )>, stats?: Maybe<(
      { __typename?: 'FlashcardStats' }
      & Pick<FlashcardStats, 'avgTime' | 'numAttempts' | 'lastSeenOn'>
    )>, creator: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'username'>
    ) }
  )> }
);

export type FlashcardsFeedQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['Float']>;
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  difficulty?: Maybe<Difficulty>;
  username?: Maybe<Scalars['String']>;
  searchTerm?: Maybe<Scalars['String']>;
}>;


export type FlashcardsFeedQuery = (
  { __typename?: 'Query' }
  & { flashcardsFeed: (
    { __typename?: 'PaginatedFlashcards' }
    & Pick<PaginatedFlashcards, 'hasMore'>
    & { flashcards: Array<(
      { __typename?: 'Flashcard' }
      & FlashcardMinimalFragment
    )> }
  ) }
);

export type MyTopTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTopTagsQuery = (
  { __typename?: 'Query' }
  & { myTopTags: Array<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'name'>
  )> }
);

export type SearchTagsQueryVariables = Exact<{
  term: Scalars['String'];
}>;


export type SearchTagsQuery = (
  { __typename?: 'Query' }
  & { searchTags: Array<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'name'>
  )> }
);

export type UserQueryVariables = Exact<{
  username?: Maybe<Scalars['String']>;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'numFlashcards' | 'createdAt'>
    & RegularUserFragment
  )> }
);

export type UserFlashcardsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['Float']>;
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  difficulty?: Maybe<Difficulty>;
  username?: Maybe<Scalars['String']>;
}>;


export type UserFlashcardsQuery = (
  { __typename?: 'Query' }
  & { userFlashcards: (
    { __typename?: 'PaginatedFlashcards' }
    & Pick<PaginatedFlashcards, 'hasMore'>
    & { flashcards: Array<(
      { __typename?: 'Flashcard' }
      & FlashcardMinimalFragment
    )> }
  ) }
);

export const FlashcardMinimalFragmentDoc = gql`
    fragment FlashcardMinimal on Flashcard {
  randId
  isFork
  isForkedByYou
  creator {
    username
    name
  }
  title
  body
  tags {
    id
    name
  }
  difficulty
  createdAt
  isPublic
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  username
  name
  email
}
    `;
export const CreateFlashcardDocument = gql`
    mutation CreateFlashcard($title: String!, $body: String!, $tags: [String!]!, $difficulty: Difficulty!, $isPublic: Boolean!) {
  createFlashcard(
    input: {title: $title, body: $body, tags: $tags, difficulty: $difficulty, isPublic: $isPublic}
  ) {
    errors {
      ...RegularError
    }
    flashcard {
      randId
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type CreateFlashcardMutationFn = Apollo.MutationFunction<CreateFlashcardMutation, CreateFlashcardMutationVariables>;

/**
 * __useCreateFlashcardMutation__
 *
 * To run a mutation, you first call `useCreateFlashcardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFlashcardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFlashcardMutation, { data, loading, error }] = useCreateFlashcardMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      tags: // value for 'tags'
 *      difficulty: // value for 'difficulty'
 *      isPublic: // value for 'isPublic'
 *   },
 * });
 */
export function useCreateFlashcardMutation(baseOptions?: Apollo.MutationHookOptions<CreateFlashcardMutation, CreateFlashcardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFlashcardMutation, CreateFlashcardMutationVariables>(CreateFlashcardDocument, options);
      }
export type CreateFlashcardMutationHookResult = ReturnType<typeof useCreateFlashcardMutation>;
export type CreateFlashcardMutationResult = Apollo.MutationResult<CreateFlashcardMutation>;
export type CreateFlashcardMutationOptions = Apollo.BaseMutationOptions<CreateFlashcardMutation, CreateFlashcardMutationVariables>;
export const DeleteFlashcardDocument = gql`
    mutation DeleteFlashcard($randId: String!) {
  deleteFlashcard(randId: $randId)
}
    `;
export type DeleteFlashcardMutationFn = Apollo.MutationFunction<DeleteFlashcardMutation, DeleteFlashcardMutationVariables>;

/**
 * __useDeleteFlashcardMutation__
 *
 * To run a mutation, you first call `useDeleteFlashcardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFlashcardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFlashcardMutation, { data, loading, error }] = useDeleteFlashcardMutation({
 *   variables: {
 *      randId: // value for 'randId'
 *   },
 * });
 */
export function useDeleteFlashcardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFlashcardMutation, DeleteFlashcardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFlashcardMutation, DeleteFlashcardMutationVariables>(DeleteFlashcardDocument, options);
      }
export type DeleteFlashcardMutationHookResult = ReturnType<typeof useDeleteFlashcardMutation>;
export type DeleteFlashcardMutationResult = Apollo.MutationResult<DeleteFlashcardMutation>;
export type DeleteFlashcardMutationOptions = Apollo.BaseMutationOptions<DeleteFlashcardMutation, DeleteFlashcardMutationVariables>;
export const ForkFlashcardDocument = gql`
    mutation ForkFlashcard($randId: String!) {
  forkFlashcard(from: $randId) {
    errors {
      ...RegularError
    }
    forkedId
  }
}
    ${RegularErrorFragmentDoc}`;
export type ForkFlashcardMutationFn = Apollo.MutationFunction<ForkFlashcardMutation, ForkFlashcardMutationVariables>;

/**
 * __useForkFlashcardMutation__
 *
 * To run a mutation, you first call `useForkFlashcardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForkFlashcardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forkFlashcardMutation, { data, loading, error }] = useForkFlashcardMutation({
 *   variables: {
 *      randId: // value for 'randId'
 *   },
 * });
 */
export function useForkFlashcardMutation(baseOptions?: Apollo.MutationHookOptions<ForkFlashcardMutation, ForkFlashcardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForkFlashcardMutation, ForkFlashcardMutationVariables>(ForkFlashcardDocument, options);
      }
export type ForkFlashcardMutationHookResult = ReturnType<typeof useForkFlashcardMutation>;
export type ForkFlashcardMutationResult = Apollo.MutationResult<ForkFlashcardMutation>;
export type ForkFlashcardMutationOptions = Apollo.BaseMutationOptions<ForkFlashcardMutation, ForkFlashcardMutationVariables>;
export const LoginDocument = gql`
    mutation Login($idToken: String!, $name: String!) {
  login(idToken: $idToken, name: $name) {
    errors {
      ...RegularError
    }
    isNewUser
    accessToken
  }
}
    ${RegularErrorFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      idToken: // value for 'idToken'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RespondToFlashcardDocument = gql`
    mutation RespondToFlashcard($randId: String!, $type: FlashcardStatus!, $duration: Float) {
  respondToFlashcard(input: {randId: $randId, type: $type, duration: $duration}) {
    errors {
      ...RegularError
    }
    done
  }
}
    ${RegularErrorFragmentDoc}`;
export type RespondToFlashcardMutationFn = Apollo.MutationFunction<RespondToFlashcardMutation, RespondToFlashcardMutationVariables>;

/**
 * __useRespondToFlashcardMutation__
 *
 * To run a mutation, you first call `useRespondToFlashcardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRespondToFlashcardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [respondToFlashcardMutation, { data, loading, error }] = useRespondToFlashcardMutation({
 *   variables: {
 *      randId: // value for 'randId'
 *      type: // value for 'type'
 *      duration: // value for 'duration'
 *   },
 * });
 */
export function useRespondToFlashcardMutation(baseOptions?: Apollo.MutationHookOptions<RespondToFlashcardMutation, RespondToFlashcardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RespondToFlashcardMutation, RespondToFlashcardMutationVariables>(RespondToFlashcardDocument, options);
      }
export type RespondToFlashcardMutationHookResult = ReturnType<typeof useRespondToFlashcardMutation>;
export type RespondToFlashcardMutationResult = Apollo.MutationResult<RespondToFlashcardMutation>;
export type RespondToFlashcardMutationOptions = Apollo.BaseMutationOptions<RespondToFlashcardMutation, RespondToFlashcardMutationVariables>;
export const UpdateFlashcardDocument = gql`
    mutation UpdateFlashcard($randId: String!, $title: String, $body: String, $tags: [String!], $isPublic: Boolean, $difficulty: Difficulty) {
  updateFlashcard(
    input: {randId: $randId, title: $title, body: $body, tags: $tags, isPublic: $isPublic, difficulty: $difficulty}
  ) {
    errors {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type UpdateFlashcardMutationFn = Apollo.MutationFunction<UpdateFlashcardMutation, UpdateFlashcardMutationVariables>;

/**
 * __useUpdateFlashcardMutation__
 *
 * To run a mutation, you first call `useUpdateFlashcardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFlashcardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFlashcardMutation, { data, loading, error }] = useUpdateFlashcardMutation({
 *   variables: {
 *      randId: // value for 'randId'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      tags: // value for 'tags'
 *      isPublic: // value for 'isPublic'
 *      difficulty: // value for 'difficulty'
 *   },
 * });
 */
export function useUpdateFlashcardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFlashcardMutation, UpdateFlashcardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFlashcardMutation, UpdateFlashcardMutationVariables>(UpdateFlashcardDocument, options);
      }
export type UpdateFlashcardMutationHookResult = ReturnType<typeof useUpdateFlashcardMutation>;
export type UpdateFlashcardMutationResult = Apollo.MutationResult<UpdateFlashcardMutation>;
export type UpdateFlashcardMutationOptions = Apollo.BaseMutationOptions<UpdateFlashcardMutation, UpdateFlashcardMutationVariables>;
export const FlashcardDocument = gql`
    query Flashcard($randId: String!) {
  flashcard(randId: $randId) {
    randId
    title
    body
    createdAt
    isPublic
    isForkedByYou
    isFork
    difficulty
    tags {
      id
      name
    }
    status
    stats {
      avgTime
      numAttempts
      lastSeenOn
    }
    creator {
      name
      username
    }
  }
}
    `;

/**
 * __useFlashcardQuery__
 *
 * To run a query within a React component, call `useFlashcardQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlashcardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlashcardQuery({
 *   variables: {
 *      randId: // value for 'randId'
 *   },
 * });
 */
export function useFlashcardQuery(baseOptions: Apollo.QueryHookOptions<FlashcardQuery, FlashcardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FlashcardQuery, FlashcardQueryVariables>(FlashcardDocument, options);
      }
export function useFlashcardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FlashcardQuery, FlashcardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FlashcardQuery, FlashcardQueryVariables>(FlashcardDocument, options);
        }
export type FlashcardQueryHookResult = ReturnType<typeof useFlashcardQuery>;
export type FlashcardLazyQueryHookResult = ReturnType<typeof useFlashcardLazyQuery>;
export type FlashcardQueryResult = Apollo.QueryResult<FlashcardQuery, FlashcardQueryVariables>;
export const FlashcardsFeedDocument = gql`
    query FlashcardsFeed($limit: Int!, $cursor: Float, $tags: [String!], $difficulty: Difficulty, $username: String, $searchTerm: String) {
  flashcardsFeed(
    input: {limit: $limit, cursor: $cursor, tags: $tags, difficulty: $difficulty, username: $username, searchTerm: $searchTerm}
  ) {
    hasMore
    flashcards {
      ...FlashcardMinimal
    }
  }
}
    ${FlashcardMinimalFragmentDoc}`;

/**
 * __useFlashcardsFeedQuery__
 *
 * To run a query within a React component, call `useFlashcardsFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlashcardsFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlashcardsFeedQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      tags: // value for 'tags'
 *      difficulty: // value for 'difficulty'
 *      username: // value for 'username'
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useFlashcardsFeedQuery(baseOptions: Apollo.QueryHookOptions<FlashcardsFeedQuery, FlashcardsFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FlashcardsFeedQuery, FlashcardsFeedQueryVariables>(FlashcardsFeedDocument, options);
      }
export function useFlashcardsFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FlashcardsFeedQuery, FlashcardsFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FlashcardsFeedQuery, FlashcardsFeedQueryVariables>(FlashcardsFeedDocument, options);
        }
export type FlashcardsFeedQueryHookResult = ReturnType<typeof useFlashcardsFeedQuery>;
export type FlashcardsFeedLazyQueryHookResult = ReturnType<typeof useFlashcardsFeedLazyQuery>;
export type FlashcardsFeedQueryResult = Apollo.QueryResult<FlashcardsFeedQuery, FlashcardsFeedQueryVariables>;
export const MyTopTagsDocument = gql`
    query MyTopTags {
  myTopTags {
    id
    name
  }
}
    `;

/**
 * __useMyTopTagsQuery__
 *
 * To run a query within a React component, call `useMyTopTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTopTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTopTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTopTagsQuery(baseOptions?: Apollo.QueryHookOptions<MyTopTagsQuery, MyTopTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyTopTagsQuery, MyTopTagsQueryVariables>(MyTopTagsDocument, options);
      }
export function useMyTopTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyTopTagsQuery, MyTopTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyTopTagsQuery, MyTopTagsQueryVariables>(MyTopTagsDocument, options);
        }
export type MyTopTagsQueryHookResult = ReturnType<typeof useMyTopTagsQuery>;
export type MyTopTagsLazyQueryHookResult = ReturnType<typeof useMyTopTagsLazyQuery>;
export type MyTopTagsQueryResult = Apollo.QueryResult<MyTopTagsQuery, MyTopTagsQueryVariables>;
export const SearchTagsDocument = gql`
    query SearchTags($term: String!) {
  searchTags(input: {term: $term}) {
    id
    name
  }
}
    `;

/**
 * __useSearchTagsQuery__
 *
 * To run a query within a React component, call `useSearchTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTagsQuery({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useSearchTagsQuery(baseOptions: Apollo.QueryHookOptions<SearchTagsQuery, SearchTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchTagsQuery, SearchTagsQueryVariables>(SearchTagsDocument, options);
      }
export function useSearchTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTagsQuery, SearchTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchTagsQuery, SearchTagsQueryVariables>(SearchTagsDocument, options);
        }
export type SearchTagsQueryHookResult = ReturnType<typeof useSearchTagsQuery>;
export type SearchTagsLazyQueryHookResult = ReturnType<typeof useSearchTagsLazyQuery>;
export type SearchTagsQueryResult = Apollo.QueryResult<SearchTagsQuery, SearchTagsQueryVariables>;
export const UserDocument = gql`
    query User($username: String) {
  user(input: {username: $username}) {
    ...RegularUser
    numFlashcards
    createdAt
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserFlashcardsDocument = gql`
    query UserFlashcards($limit: Int!, $cursor: Float, $tags: [String!], $difficulty: Difficulty, $username: String) {
  userFlashcards(
    input: {limit: $limit, cursor: $cursor, tags: $tags, difficulty: $difficulty, username: $username}
  ) {
    hasMore
    flashcards {
      ...FlashcardMinimal
    }
  }
}
    ${FlashcardMinimalFragmentDoc}`;

/**
 * __useUserFlashcardsQuery__
 *
 * To run a query within a React component, call `useUserFlashcardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFlashcardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFlashcardsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      tags: // value for 'tags'
 *      difficulty: // value for 'difficulty'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserFlashcardsQuery(baseOptions: Apollo.QueryHookOptions<UserFlashcardsQuery, UserFlashcardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFlashcardsQuery, UserFlashcardsQueryVariables>(UserFlashcardsDocument, options);
      }
export function useUserFlashcardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFlashcardsQuery, UserFlashcardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFlashcardsQuery, UserFlashcardsQueryVariables>(UserFlashcardsDocument, options);
        }
export type UserFlashcardsQueryHookResult = ReturnType<typeof useUserFlashcardsQuery>;
export type UserFlashcardsLazyQueryHookResult = ReturnType<typeof useUserFlashcardsLazyQuery>;
export type UserFlashcardsQueryResult = Apollo.QueryResult<UserFlashcardsQuery, UserFlashcardsQueryVariables>;