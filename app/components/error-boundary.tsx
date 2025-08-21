"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Check if it's a WebGL context error
    if (error.message.includes('WebGL') || error.message.includes('context')) {
      console.warn('WebGL context error detected, showing fallback')
    }
  }

  render() {
    if (this.state.hasError) {
      // Check if it's a WebGL-related error
      const isWebGLError = this.state.error?.message.includes('WebGL') || 
                           this.state.error?.message.includes('context')
      
      if (isWebGLError) {
        return (
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <h1 className="text-2xl font-bold mb-4">3D Experience Unavailable</h1>
              <p className="text-muted-foreground mb-6">
                We encountered an issue with the 3D graphics on your device. This could be due to:
              </p>
              <ul className="text-left text-sm text-muted-foreground mb-6 space-y-2">
                <li>• WebGL not supported by your browser</li>
                <li>• Graphics drivers need updating</li>
                <li>• Hardware acceleration disabled</li>
                <li>• Browser compatibility issues</li>
              </ul>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      }

      // Generic error fallback
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
