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
        <div className="v-node-type">
          <NodeLink node={node.type} type="name" />
        </div>
        {
          node.attrs.map((attr) => (
            <div className="v-node-attr" key={attr.ati}>
              <NodeLink node={attr.type} type="name" />
              {": "}
              <span>{ attr.value }</span>
            </div>
          ))
        }
        {
          node.refs.map((ref) => (
            <div className="v-node-ref" key={ref.ri}>
              <NodeLink node={ref.type} type="name" />
              {": "}
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
    let label = "";
    switch (this.props.type) {
      case "name": label += node.name; break;
      default: label += (node.name || '') + "<" + node.type.name + ">";
    }
    const linkStyle = {
      textDecoration: 'none',
      color: 'black'
    }
    return (
      <a href={path} style={linkStyle} onClick={this.handleClick}>{ label }</a>
    );
  }
  handleClick (event) {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    browserHistory.push(path);
  }

}

