import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import $ from 'jquery';

ReactDOM.render(<App />, document.getElementById('root'));

import rawRepoLoader from 'livescript!./raw-repo-loader.ls'
import Repo from 'livescript!./reactive-graph/Repo.ls'
import mbox, {autorun,computed} from "mobx";

var repo = new Repo('core');
window.repo = repo;
repo.load().done(function() {
  autorun(() => console.log("Node 2 type name: ", repo.node('2').type.name));
});

