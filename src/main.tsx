import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { MyPostsProvider } from './context/MyPostsContext';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <ThemeProvider>
          <FavoritesProvider>
            <MyPostsProvider>
              <App />
            </MyPostsProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
