const App = require('./app');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
module.exports = ReactDOMServer.renderToString(<App/>);
