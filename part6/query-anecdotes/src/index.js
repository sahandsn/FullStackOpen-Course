import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import App from './App'
import { AnecdotesContextProvider } from './AnecdotesContex'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient} >
    <AnecdotesContextProvider>
      <App />
    </AnecdotesContextProvider> 
  </QueryClientProvider>
)