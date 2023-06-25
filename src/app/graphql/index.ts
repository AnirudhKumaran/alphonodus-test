import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

const httpLink = new HttpLink({ uri: 'https://graph.dev.jit.care/graphql' });

const authLink = new ApolloLink((operation, forward) => {

    const token = process.env.REACT_APP_LOCATION_API_TOKEN  
    
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  
    // Call the next link in the middleware chain.
    return forward(operation);
  });

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink), // Chain it with the HttpLink
    cache: new InMemoryCache()
  });