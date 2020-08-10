import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

export const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  cache
});