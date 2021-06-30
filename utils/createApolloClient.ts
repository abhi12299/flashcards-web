import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { RetryLink } from '@apollo/link-retry';
import ApolloLinkTimeout from 'apollo-link-timeout';

export const createApolloClient = () => {
  const httpLink = new HttpLink({ uri: `${process.env.NEXT_PUBLIC_API_BASE}/graphql` });
  const timeoutLink = new ApolloLinkTimeout(10000); // 10s timeout

  const authLink = setContext(async (_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const retryLink = new RetryLink({
    delay: {
      initial: 100,
      max: 500,
    },
    attempts: {
      max: 3,
      retryIf: (error, _operation) => {
        if (error.message === 'Network request failed') {
          // if (_operation.operationName === 'createPost') {
          return true;
          // }
        }
        return false;
      },
    },
  });

  const link = ApolloLink.from([retryLink, timeoutLink, authLink, httpLink]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
  return client;
};
