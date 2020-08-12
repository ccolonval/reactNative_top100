import React, {PureComponent} from 'react';
import { Provider} from 'react-redux';
import store from './src/core/store';
import Main from './src/components/layout/main';

export default class App extends PureComponent{
  render() {
    return <Provider store={store}><Main propMessage="this is a custom property to a component"/></Provider>
  }
}