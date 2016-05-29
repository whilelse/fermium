import prelude, {map,each,concat,join,find,filter} from 'prelude-ls'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link, Redirect } from 'react-router'
import $ from 'jquery';
import mbox, {autorun,computed} from "mobx";
import {observer} from "mobx-react";

import {DocumentRepo} from 'ui/DocumentRepo';

ReactDOM.render((
  <Router history={browserHistory}>
    <Redirect from="/" to="/doc/core/node/9" />
    <Route path="/doc/:docname/node/:ni" component={DocumentRepo} />
  </Router>
), document.getElementById('root'));

