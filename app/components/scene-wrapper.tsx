"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// WebGL support detection
function isWebGLAvailable() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch (e) {
    return false
  }
}

// Fallback component when WebGL is not available
function WebGLFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <h3 className="text-lg font-semibold mb-2">3D Experience Unavailable</h3>
        <p className="text-muted-foreground">
          Your device or browser doesn't support WebGL, which is required for 3D graphics.
        </p>
      </div>
    </div>
  )
}

const Scene = dynamic(() => import("./scene"), { 
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading 3D scene...</p>
      </div>
    </div>
  )
})

export default function SceneWrapper() {
  const [webGLAvailable, setWebGLAvailable] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWebGLAvailable(isWebGLAvailable())
    }
  }, [])

  if (!webGLAvailable) {
    return <WebGLFallback />
  }

  if (hasError) {
    return <WebGLFallback />
  }

  return (
    <div onError={() => setHasError(true)}>
      <Scene />
    </div>
  )
} 