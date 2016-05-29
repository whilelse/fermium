import prelude, {map,each,concat,join,find,filter} from 'prelude-ls'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import mbox, {autorun,computed} from "mobx";
import {observer} from "mobx-react";

import rawRepoLoader from 'livescript!./raw-repo-loader.ls'
import Repo from 'livescript!./reactive-graph/Repo.ls'

var repo = new Repo('core');
window._repo = repo;
repo.load().done(function() {
  autorun(() => console.log("Node 2 type name: ", repo.node('2').type.name));
});


import {App} from 'ui/App'
ReactDOM.render(<App repo={repo} />, document.getElementById('root'));

