import React, { Component } from 'react';
import { AppConsumer } from '../components';

export const withUsername = (WrappedComponent) =>
  class UserComponent extends Component {
    render() {
      return (
        <AppConsumer>
          {({username}) => <WrappedComponent {...this.props} username={username} />}
        </AppConsumer>
      );
    }
}
