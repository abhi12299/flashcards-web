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
  id: Scalars['Float'];
  title: Scalars['String'];
  body: Scalars['String'];
  isPublic: Scalars['Boolean'];
  isFork: Scalars['Boolean'];
  difficulty: Difficulty;
  tags: Array<Tag>;
  creatorId: Scalars['Float'];
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
  done: Scalars['Boolean'];
};

export type GetFlashcardsHistoryInput = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
};

export type GetFlashcardsInput = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  difficulty?: Maybe<Difficulty>;
  creatorId?: Maybe<Scalars['Int']>;
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
  id: Scalars['Int'];
};


export type MutationForkFlashcardArgs = {
  from: Scalars['Int'];
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
  total: Scalars['Int'];
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
  myTags: Array<Tag>;
  allTags: Array<Tag>;
  me?: Maybe<User>;
};


export type QueryFlashcardsFeedArgs = {
  input: GetFlashcardsInput;
};


export type QueryUserFlashcardsArgs = {
  input: GetFlashcardsInput;
};


export type QueryFlashcardArgs = {
  id: Scalars['Int'];
};


export type QueryFlashcardsReportArgs = {
  input: FlashcardReportInput;
};


export type QueryFlashcardHistoryArgs = {
  input: GetFlashcardsHistoryInput;
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
  id: Scalars['Int'];
  type: FlashcardStatus;
  duration?: Maybe<Scalars['Float']>;
};

export type RespondToFlashcardResponse = {
  __typename?: 'RespondToFlashcardResponse';
  errors?: Maybe<Array<FieldError>>;
  done: Scalars['Boolean'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float'];
  name: Scalars['String'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type UpdateFlashcardInput = {
  id: Scalars['Int'];
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
  id: Scalars['Float'];
  name: Scalars['String'];
  email: Scalars['String'];
  profilePic: Scalars['String'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  numFlashcards: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  isNewUser?: Maybe<Scalars['Boolean']>;
  accessToken?: Maybe<Scalars['String']>;
};

export type FlashcardMinimalFragment = (
  { __typename?: 'Flashcard' }
  & Pick<Flashcard, 'id' | 'isFork' | 'title' | 'body' | 'difficulty' | 'createdAt' | 'isPublic'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'profilePic'>
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
  & Pick<User, 'id' | 'name' | 'email' | 'profilePic'>
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
      & Pick<Flashcard, 'id'>
    )> }
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

export type FlashcardsFeedQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  difficulty?: Maybe<Difficulty>;
  creatorId?: Maybe<Scalars['Int']>;
}>;


export type FlashcardsFeedQuery = (
  { __typename?: 'Query' }
  & { flashcardsFeed: (
    { __typename?: 'PaginatedFlashcards' }
    & Pick<PaginatedFlashcards, 'hasMore' | 'total'>
    & { flashcards: Array<(
      { __typename?: 'Flashcard' }
      & FlashcardMinimalFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'numFlashcards' | 'createdAt'>
    & RegularUserFragment
  )> }
);

export type UserFlashcardsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  difficulty?: Maybe<Difficulty>;
  creatorId?: Maybe<Scalars['Int']>;
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
  id
  isFork
  creator {
    id
    name
    profilePic
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
  id
  name
  email
  profilePic
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
      id
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
export const FlashcardsFeedDocument = gql`
    query FlashcardsFeed($limit: Int!, $cursor: String, $tags: [String!], $difficulty: Difficulty, $creatorId: Int) {
  flashcardsFeed(
    input: {limit: $limit, cursor: $cursor, tags: $tags, difficulty: $difficulty, creatorId: $creatorId}
  ) {
    hasMore
    total
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
 *      creatorId: // value for 'creatorId'
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
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
    numFlashcards
    createdAt
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserFlashcardsDocument = gql`
    query UserFlashcards($limit: Int!, $cursor: String, $tags: [String!], $difficulty: Difficulty, $creatorId: Int) {
  userFlashcards(
    input: {limit: $limit, cursor: $cursor, tags: $tags, difficulty: $difficulty, creatorId: $creatorId}
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
 *      creatorId: // value for 'creatorId'
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