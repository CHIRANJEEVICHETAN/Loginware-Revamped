import { Suspense, useEffect } from "react"
import Navigation from "./components/navigation"
import Hero from "./components/hero"
import Products from "./components/products"
import Ecosystem from "./components/ecosystem"
import Expertise from "./components/expertise"
import CaseStudies from "./components/case-studies"
import Contact from "./components/contact"
import Footer from "./components/footer"
import CustomCursor from "./components/custom-cursor"
import FloatingActions from "./components/floating-actions"
import SceneWrapper from "./components/scene-wrapper"
import { ScrollProgress } from "@/app/components/scroll-progress"
import { AnimatedSection } from "@/app/components/animated-section"
import Features from "./components/features"
import { TestimonialsSectionDemo } from "@/components/ui/code.demo"
import { WebGLErrorBoundary } from "./components/webgl-error-boundary"

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
    <div className="fixed inset-0 z-0 bg-background flex items-center justify-center">
      <div className="text-center p-8">
        <h3 className="text-lg font-semibold mb-2">3D Experience Unavailable</h3>
        <p className="text-muted-foreground">
          Your device or browser doesn't support WebGL, which is required for 3D graphics.
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    // Global error handler for WebGL and Three.js errors
    const handleError = (event: ErrorEvent) => {
      if (event.error && (
        event.error.message.includes('WebGL') ||
        event.error.message.includes('THREE') ||
        event.error.message.includes('context') ||
        event.error.message.includes('WebGLRenderer')
      )) {
        console.warn('WebGL/Three.js error caught by global handler:', event.error)
        // Prevent the error from crashing the app
        event.preventDefault()
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && (
        event.reason.message?.includes('WebGL') ||
        event.reason.message?.includes('THREE') ||
        event.reason.message?.includes('context') ||
        event.reason.message?.includes('WebGLRenderer')
      )) {
        console.warn('WebGL/Three.js promise rejection caught:', event.reason)
        // Prevent the rejection from crashing the app
        event.preventDefault()
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navigation />
      <div className="fixed inset-0 z-0">
        <WebGLErrorBoundary fallback={
          <div className="fixed inset-0 z-0 bg-background flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-lg font-semibold mb-2">3D Experience Unavailable</h3>
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
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        }>
          <Suspense fallback={
            <div className="fixed inset-0 z-0 bg-background flex items-center justify-center">
              <div className="text-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading 3D scene...</p>
              </div>
            </div>
          }>
            <SceneWrapper />
          </Suspense>
        </WebGLErrorBoundary>
      </div>
      <div className="relative z-10">
        <ScrollProgress />
        <Hero />
        <AnimatedSection delay={0.2}>
          <Products />
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <Features />
        </AnimatedSection>
        <Ecosystem />
        <Expertise />
        <CaseStudies />
        <TestimonialsSectionDemo />
        <Contact />
        <Footer />
      </div>
      <FloatingActions />
    </main>
  )
}