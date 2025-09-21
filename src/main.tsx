import React from 'react'
import { createRoot } from 'react-dom/client'

// Import App as a regular module
const App = React.lazy(() => import('./App'))

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error('Root element not found')

const root = createRoot(rootElement)

// Use React.createElement to avoid JSX transform issues completely
root.render(
  React.createElement('div', { style: { width: '100%', height: '100vh' } },
    React.createElement(React.Suspense, 
      { fallback: React.createElement('div', {}, 'Loading...') },
      React.createElement(App)
    )
  )
)
