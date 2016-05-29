import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import $ from 'jquery';

ReactDOM.render(<App />, document.getElementById('root'));

import rawRepoLoader from 'livescript!./raw-repo-loader.ls'
import Repo from 'livescript!./reactive-graph/Repo.ls'

var repo = new Repo('core')
repo.load().done(function() {
  console.log("Node 1 ", repo.node('1'));
});

