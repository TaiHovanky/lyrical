import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'; //gets data from server and stores it locally. framework-agnostic.
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';

const client = new ApolloClient({}); //assumes the graphQL server is available on the /graphql route

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="/songs/new" component={SongCreate} />
        </Route>
      </Router>
    </ApolloProvider>
  ); //ApolloProvider is a React component and client is a prop
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
