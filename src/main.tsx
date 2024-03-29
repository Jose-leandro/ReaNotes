import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Toaster } from 'sonner'
import { Header } from './components/header'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <header>
      <Header />
    </header>
    <main>
      <App />
      <Toaster richColors />
    </main>
    <footer>

    </footer>
  </React.StrictMode>
)
