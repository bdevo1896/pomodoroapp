import App from 'next/app'
import React from 'react'
import OfflineSupport from '../src/components/OfflineSupport';
import Layout from '../src/containers/Layout';
import {Provider} from 'react-redux';
import store from '../src/redux/store/index';

class MyApp extends App {

  
  constructor(props) {
    super(props);
  }

  render () {
    const { Component, pageProps } = this.props;
    return (
        <Provider store={store}>
        <OfflineSupport />
        <Layout>
        <Component 
            {...pageProps}
        />
        </Layout>
        </Provider>
    )
  }
}

export default MyApp;