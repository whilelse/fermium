import prelude, {map,each,concat,join,find,filter} from 'prelude-ls'
import React, { Component } from 'react';
import mbox, {autorun,computed} from "mobx";
import {observer} from "mobx-react";
import {browserHistory} from 'react-router'

@observer export class Node extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this._elements = ['type'];
    let node = this.props.node;
    node.attrs.map((attr) => this._elements.push('a:' + attr.ati))
    node.refs.map((ref) => this._elements.push('r:' + ref.ri))
  }
  render() {
    let node = this.props.node;
    let activeChild = this._elements[this.state.activeIndex];
    return (
      <div className="v-node" ref={(c) => console.log("ref-main", c)}>
        <div className="v-node-name">{ node.name }</div>
        <div className="v-node-type">
          <NodeLink node={node.type} type="name" active={activeChild == 'type'} />
        </div>
        {
          node.attrs.map((attr) => (
            <div className="v-node-attr" key={attr.ati}>
              <NodeLink node={attr.type} type="name" active={activeChild == 'a:' + attr.ati} />
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
              <NodeLink node={ref.target} active={activeChild == 'r:' + ref.ri} />
            </div>
          ))
        }
        <button onClick={this.handleMovement.bind(this, 1)}>Down</button>
        <button onClick={this.handleMovement.bind(this, -1)}>Up</button>
      </div>
    )
  }
  handleMovement (dir) {
    this.setState({ activeIndex: this.state.activeIndex + dir });
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
    var linkStyle = {
      textDecoration: 'none',
      color: 'black'
    }
    if (this.props.active) linkStyle.backgroundColor = 'yellow';
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

