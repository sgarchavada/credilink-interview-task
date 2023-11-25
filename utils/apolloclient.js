import React from 'react';

import {
  ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache,
} from '@apollo/client';


const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL });
const middlewareAuthLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'x-hasura-role': 'public_user',
    },
  });
  return forward(operation);
});
const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);
export const clientTemp = new ApolloClient({
  ssrMode: typeof window === 'undefined', // set to true for SSR
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache({
    addTypename: false,
    resultCaching: false,
  }),
});


export const ApolloComponent = ({ pageProps, Component }) => {
  return (
    <ApolloProvider client={clientTemp}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};
