import prelude, {map,each,concat,join,find,filter} from 'prelude-ls'
import React, { Component } from 'react';
import mbox, {autorun,computed} from "mobx";
import {observer} from "mobx-react";

import {Node} from 'ui/Node';
import {getRepo} from 'globals';

@observer export class DocumentRepo extends Component {
  render() {
    let dn = this.props.params.dn; // document name
    let ni = this.props.params.ni; // node id
    var repo = getRepo(dn);
    window._repo = repo;
    return (
      <div>
        {
          repo.loaded ? (
            <Node node={repo.node(ni)} />
          ) : (
            "Loading..."
          )
        }
      </div>
    )
  }
}

