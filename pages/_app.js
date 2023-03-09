import '../styles/globals.css'
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../util/cache';
import lightTheme from '../styles/theme';
import { Provider } from "react-redux";
import { store } from "../store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const clientSideEmotionCache = createEmotionCache();


function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <ToastContainer position="bottom-left" />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )

}

export default MyApp
