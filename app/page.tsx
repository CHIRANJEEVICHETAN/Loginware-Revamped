import { Suspense } from "react"
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

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <CustomCursor />
      <Navigation />
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <SceneWrapper />
        </Suspense>
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