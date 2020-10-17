import React from 'react';
import ReactDOM from 'react-dom';
import { serverURL } from './Constants';
import './index.css';
import App from './App';
import { ApolloProvider,ApolloClient,InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'
const client = new ApolloClient({
  link: createUploadLink({uri: serverURL}),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
