import prelude, {map,each,concat,join,find,filter} from 'prelude-ls'
import React, { Component } from 'react';
import mbox, {autorun,computed} from "mobx";
import {observer} from "mobx-react";

@observer export class Node extends Component {
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


