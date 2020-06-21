import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Posts} from "./components/Posts";
import {PostView} from "./components/PostView";
import {Login} from "./components/login";
import {Signup} from "./components/signup";
import {CreatePost} from "./components/createPost";
import {Logout} from "./components/logout";

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Posts} />
        <Route path='/postView/:post_id' component={PostView} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/createPost' component={CreatePost} />
        <Route path='/logout' component={Logout} />
      </Layout>
    );
  }
}
