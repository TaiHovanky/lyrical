import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'; //gets data from server and stores it locally. framework-agnostic.
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList'

const client = new ApolloClient({}); //assumes the graphQL server is available on the /graphql route

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <SongList />
    </ApolloProvider>
  ); //ApolloProvider is a React component and client is a prop
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
