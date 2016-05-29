import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import mbox, {autorun,computed} from "mobx";
import {observer} from "mobx-react";

import rawRepoLoader from 'livescript!./raw-repo-loader.ls'
import Repo from 'livescript!./reactive-graph/Repo.ls'

var repo = new Repo('core');
window.repo = repo;
repo.load().done(function() {
  autorun(() => console.log("Node 2 type name: ", repo.node('2').type.name));
});

@observer class App extends Component {
  render() {
    return (
      <div>
        {
          repo.loaded ? (
            "node(2).type.name: " + repo.node(2).type.name
          ) : (
            "Loading..."
          )
        }
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

