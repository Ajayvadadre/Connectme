import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Router from "next/router";

import { SessionProvider } from "next-auth/react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../redux/reducer/index";

const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

import "../styles/scss/index.css";
import "swiper/css";

import { useState } from "react";
import Loading from "../src/components/Loading";
import { useEffect } from "react";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const [loading, setLoading] = useState(false)
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    session,
  } = props;

  Router.events.on("routeChangeStart",()=>{
    setLoading(true)
    
  })
  
  Router.events.on("routeChangeComplete",()=>{
    setLoading(false)
  })

  useEffect(()=>{

  },[loading])
  
  
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="user-scalable=no" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="HandheldFriendly" content="true" />
        
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionProvider session={session}>
          <Provider store={store}>
            {
              loading ? <Loading /> : (
                <Component {...pageProps} />
              )
            }
          </Provider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
