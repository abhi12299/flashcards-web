import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { RetryLink } from "@apollo/link-retry";
import ApolloLinkTimeout from "apollo-link-timeout";
import cookie from "cookie";
import { NextPageContext } from "next";
import { createWithApollo } from "./createWithApollo";

const createClient = (ctx: NextPageContext) => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_BASE}/graphql`,
  });
  const timeoutLink = new ApolloLinkTimeout(10000); // 10s timeout

  const authLink = setContext((_, { headers }) => {
    const ck = cookie.parse(
      ctx ? ctx.req?.headers.cookie || "" : document.cookie
    );
    const token = ck.token || "";
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
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
        if (error.message === "Network request failed") {
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
    credentials: "include",
    // headers: {
    //   cookie:
    //     (typeof window === "undefined"
    //       ? ctx?.req?.headers.cookie
    //       : undefined) || "",
    // },
    cache: new InMemoryCache({}),
  });
  return client;
};

export const withApollo = createWithApollo(createClient);
