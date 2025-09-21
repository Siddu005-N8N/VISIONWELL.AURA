import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force classic JSX
const rootElement = document.getElementById("root")
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

const root = createRoot(rootElement)
root.render(
  React.createElement(React.StrictMode, {},
    React.createElement(App, {})
  )
)
