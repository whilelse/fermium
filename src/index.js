import prelude, {map,each,concat,join,find,filter} from 'prelude-ls'
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


@observer class Node extends Component {
  render() {
    let node = this.props.node;
    return (
      <div className="v-node">
        <div className="v-node-name">{ node.name }</div>
        <div className="v-node-type">{ node.type.name }</div>
        {
          node.attrs.map((attr) => (
            <div className="v-node-attr" key={attr.ati}>
              <span>{ attr.name }</span>:
              <span>{ attr.value }</span>
            </div>
          ))
        }
        {
          node.refs.map((ref) => (
            <div className="v-node-ref" key={ref.ri}>
              <span>{ ref.type.name }</span>:
              <span>{ ref.target.ni }</span>
            </div>
          ))
        }
      </div>
    )
  }
}

@observer class App extends Component {
  render() {
    return (
      <div>
        {
          repo.loaded ? (
            <Node node={repo.node(9)} />
          ) : (
            "Loading..."
          )
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

