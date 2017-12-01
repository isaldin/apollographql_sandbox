import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { BatchHttpLink } from "apollo-link-batch-http";
import { InMemoryCache } from 'apollo-cache-inmemory'
import 'tachyons'

import ListPage from './components/ListPage';
// import CreatePost from './components/CreatePost';
import './index.css';

const httpLink = new BatchHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjamlrgux1wbw0113587gjirq',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' component={ListPage} />
        {/*<Switch>*/}
          {/*<Route exact path='/post/create' component={ListPage} />*/}
        {/*</Switch>*/}
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
