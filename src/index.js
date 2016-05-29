import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import $ from 'jquery';

ReactDOM.render(<App />, document.getElementById('root'));

import rawRepoLoader from 'livescript!./raw-repo-loader.ls'

rawRepoLoader('core').done(function(rawRepo) {
  console.log("Loaded ", rawRepo);
});

