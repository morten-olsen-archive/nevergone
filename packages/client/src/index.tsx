// import 'react-native-gesture-handler';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './screens/App';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

const iconFont = require('react-native-vector-icons/Fonts/Ionicons.ttf').default;
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Ionicons;
}`;

// Create stylesheet
const style = document.createElement('style') as any;
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

document.body.style.height = '100%';
document.documentElement.style.height = '100%';
const root = document.createElement('div');
root.style.height = '100%';
root.style.display = 'flex';
document.body.appendChild(root);

const app = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(app, root);

