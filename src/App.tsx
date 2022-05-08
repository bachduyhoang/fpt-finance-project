// routes
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { useState } from 'react';

import Router from './routes';
// theme
import ThemeConfig from './theme';
// hooks
import useAuth from './hooks/useAuth';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import GoogleAnalytics from './components/GoogleAnalytics';
import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import ThemeLocalization from './components/ThemeLocalization';

// ----------------------------------------------------------------------

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          // onSuccess: (data) => console.log(data)
        })
      })
  );
  const { isInitialized } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <ThemeConfig>
        <ThemePrimaryColor>
          <ThemeLocalization>
            <RtlLayout>
              <NotistackProvider>
                <Settings />
                <ScrollToTop />
                <GoogleAnalytics />
                {isInitialized ? <Router /> : <LoadingScreen />}
              </NotistackProvider>
            </RtlLayout>
          </ThemeLocalization>
        </ThemePrimaryColor>
      </ThemeConfig>
    </QueryClientProvider>
  );
}
