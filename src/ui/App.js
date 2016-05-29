import prelude, {map,each,concat,join,find,filter} from 'prelude-ls'
import React, { Component } from 'react';
import mbox, {autorun,computed} from "mobx";
import {observer} from "mobx-react";

import {Node} from 'ui/Node'

@observer export class App extends Component {
  render() {
    let repo = this.props.repo;
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
