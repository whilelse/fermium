import prelude, {map,each,concat,join,find,filter} from 'prelude-ls'
import React, { Component } from 'react';
import mbox, {autorun,computed} from "mobx";
import {observer} from "mobx-react";
import {browserHistory} from 'react-router'

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
              <NodeLink node={ref.target} />
            </div>
          ))
        }
      </div>
    )
  }
}


@observer class NodeLink extends Component {
  render () {
    const node = this.props.node;
    const path = '/doc/' + node.repo.dn + '/node/' + node.ni;
    return (
      <a href={path} onClick={this.handleClick}>{ node.ni }</a>
    );
  }
  handleClick (event) {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    browserHistory.push(path);
  }

}

