import React, { createContext, Component } from 'react';
import { node } from 'prop-types';

export const AppContext = createContext({
  changeUsername: () => null,
});

export const AppConsumer = AppContext.Consumer;

export class AppProvider extends Component {
  static propTypes = {
    children: node.isRequired
  }

  state = {
    username: '',
    token: '',
  }

  changeUsername = (username) => {
    this.setState({ username });
  }

  render() {
    const {
      changeUsername,
      state,
      props: { children },
    } = this;

    return (
      <AppContext.Provider value={{
        ...state,
        changeUsername,
      }}>
        {children}
      </AppContext.Provider>
    )
  }
}
