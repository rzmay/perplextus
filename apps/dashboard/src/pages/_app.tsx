import { config as faConfig } from '@fortawesome/fontawesome-svg-core';
import axios from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import { SWRConfig } from 'swr';

// Import styles
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';

// Patch Font Awesome SSR bug
faConfig.autoAddCss = false;

// Extend Day.js
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);

// Register syntax highlighter languages
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('jsx', jsx);

type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SWRConfig
      value={{
        fetcher: ([url, query]) =>
          axios
            .get(url, { params: query && JSON.parse(query) })
            .then((res) => res.data),
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </SWRConfig>
  );
}
