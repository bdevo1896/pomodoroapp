import App from 'next/app'
import React from 'react'
// import withApolloClient from '../src/util/withApolloClient'
// import { ApolloProvider } from 'react-apollo'
// import '../src/dist/css/styles.css';
import OfflineSupport from '../src/components/OfflineSupport';
import Layout from '../src/containers/Layout';
import {Provider} from 'react-redux';
import store from '../src/redux/store/index';

class MyApp extends App {

  
  constructor(props) {
    super(props);
  }

  render () {
    // const { Component, pageProps, apolloClient } = this.props;
    const { Component, pageProps } = this.props;

    // return (
    //     <ApolloProvider client={apolloClient}>
    //       <Provider store={store}>
    //         <OfflineSupport />
    //         <Layout>
    //         <Component 
    //           {...pageProps}
    //           client= {apolloClient}
    //         />
    //         </Layout>
    //       </Provider>
    //   </ApolloProvider>
    // )

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

// export default withApolloClient(MyApp)

export default MyApp;