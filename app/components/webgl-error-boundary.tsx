"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebGLErrorBoundary caught an error:', error, errorInfo)
    
    // Check if it's a WebGL context error
    if (error.message.includes('WebGL') || 
        error.message.includes('context') || 
        error.message.includes('THREE') ||
        error.message.includes('WebGLRenderer')) {
      console.warn('WebGL/Three.js error detected, showing fallback')
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default WebGL error fallback
      return (
        <div className="fixed inset-0 bg-background flex items-center justify-center p-4 z-50">
          <div className="text-center max-w-md">
            <h3 className="text-lg font-semibold mb-2">3D Graphics Unavailable</h3>
            <p className="text-muted-foreground mb-4">
              We encountered an issue with the 3D graphics. This could be due to:
            </p>
            <ul className="text-left text-sm text-muted-foreground mb-6 space-y-2">
              <li>• WebGL not supported by your browser</li>
              <li>• Graphics drivers need updating</li>
              <li>• Hardware acceleration disabled</li>
              <li>• Browser compatibility issues</li>
            </ul>
            <div className="space-x-3">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
