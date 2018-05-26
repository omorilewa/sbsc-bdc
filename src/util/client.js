import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { getItem } from '.';
import { introspectionQueryResultData } from '.';


const uri = 'https://bdc-api.herokuapp.com/api/graphql';

// create a new httpLink accepting the uri as a config option
const httpLink = new HttpLink({ uri });


const authLink = setContext((_, { headers }) => {
  // get the authentication token from async storage if it exists
  // return the headers to the context so httpLink can read them
  return getItem('token').then(token => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
});

// Handle and inspect errors in the GraphQL network stack.
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
      ),
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
  link,
  cache
});

export default client;

