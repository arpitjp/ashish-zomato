import React from 'react'
import './app.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { reactQueryClient } from './utils/react-query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Header } from './components/header';
import { GameArea } from './components/game-area';

function App() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <Header />
      <GameArea />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
