import '../styles/globals.css'
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../util/cache';
import lightTheme from '../styles/theme';
import { Provider } from "react-redux";
import { store } from "../store";




const clientSideEmotionCache = createEmotionCache();


function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )

}

export default MyApp
