'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee"
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Static image for fallback
const STATIC_IMAGE_URL = "/images/robot-static.png" // Add your static robot image

// Error Boundary Component
function ErrorFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/5">
      <div className="text-center p-4">
        <p className="text-muted-foreground">Unable to load 3D model</p>
      </div>
    </div>
  )
}

// Loading Component
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse bg-muted/20 rounded-lg w-full h-full" />
    </div>
  )
}

function Scene3D({ className }: { className?: string }) {
  const [isMobile, setIsMobile] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Dynamically import SplineScene with error handling
  const SplineScene = dynamic(
    () => import('@/components/ui/splite')
      .then(mod => mod.SplineScene)
      .catch(err => {
        console.error('Failed to load Spline component:', err)
        setHasError(true)
        return () => <ErrorFallback />
      }),
    {
      ssr: false,
      loading: () => <LoadingFallback />
    }
  )

  if (hasError || isMobile) {
    return (
      <div className={className}>
        <Image
          src={STATIC_IMAGE_URL}
          alt="Industrial Robot"
          width={500}
          height={500}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    )
  }

  return (
    <div ref={ref} className={className}>
      {inView && (
        <Suspense fallback={<LoadingFallback />}>
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </Suspense>
      )}
    </div>
  )
}

const testimonials = [
  {
    author: {
      name: "Rajesh Kumar",
      handle: "Manufacturing Head",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Loginware's IIOT solutions have revolutionized our manufacturing process. Their EAGLE platform has helped us achieve 40% improvement in operational efficiency.",
  },
  {
    author: {
      name: "Priya Sharma",
      handle: "Plant Manager",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "The real-time monitoring capabilities of SPARROW have transformed how we handle quality control. We've reduced defects by 30% since implementation.",
  },
  {
    author: {
      name: "Amit Patel",
      handle: "Operations Director",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "Loginware's predictive maintenance solution has saved us millions in downtime costs. Their support team's expertise in IIOT is exceptional.",
  },
  {
    author: {
      name: "Sneha Reddy",
      handle: "Digital Transformation Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "The integration of IIOT sensors with our legacy systems was seamless. Loginware's team understood our needs and delivered beyond expectations.",
  },
  {
    author: {
      name: "Vikram Singh",
      handle: "Production Head",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    text: "Their Industry 4.0 solutions have given us complete visibility into our production line. The data insights have been invaluable for decision-making.",
  }
]

export function SplineSceneBasic() {
  const [activeTab, setActiveTab] = useState(0);

  const solutions = [
    {
      title: "Eagle & Eagle Pro",
      description: "Advanced IIOT platform for real-time monitoring, data analytics, and predictive maintenance. Seamlessly connect your industrial assets for enhanced productivity.",
      features: ["Real-time Analytics", "Predictive Maintenance", "Asset Tracking"]
    },
    {
      title: "Sparrow",
      description: "Intelligent quality control and process optimization solution. Automate inspections and ensure consistent product quality across your manufacturing line.",
      features: ["Quality Control", "Process Optimization", "Automated Inspection"]
    },
    {
      title: "FeatherGauge & FeatherWatt",
      description: "Smart energy monitoring and management systems. Optimize power consumption and reduce operational costs with intelligent energy insights.",
      features: ["Energy Monitoring", "Cost Optimization", "Sustainability"]
    }
  ];

  return (
    <Card className="w-full min-h-[600px] md:h-[500px] bg-black/[0.96] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
      />
      
      <div className="flex flex-col-reverse md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 px-4 py-6 md:p-8 relative z-10 flex flex-col justify-center items-center text-center">
          <div className="w-full max-w-xl md:max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Smart Factory Solutions
            </h1>
            
            {/* Tabs */}
            <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-2 px-2">
              {solutions.map((solution, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={cn(
                    "px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm transition-all whitespace-nowrap",
                    activeTab === idx 
                      ? "bg-primary/20 text-primary" 
                      : "hover:bg-primary/10 text-muted-foreground"
                  )}
                >
                  {solution.title}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="mt-4 md:mt-6 px-2">
              <div className="text-neutral-300 text-sm md:text-base">
                {solutions[activeTab].description}
              </div>
              
              {/* Features */}
              <div className="mt-3 md:mt-4 flex flex-wrap justify-center gap-2">
                {solutions[activeTab].features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-1 md:px-3 md:py-1 bg-primary/10 rounded-full text-xs md:text-sm text-primary"
                  >
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary"></span>
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 px-4">
              <Button
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 text-white hover:opacity-90 transition-opacity text-base md:text-lg group"
              >
                Explore Solutions
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full md:w-auto border-violet-600 text-base md:text-lg hover:bg-gradient-to-r hover:from-violet-600 hover:via-blue-500 hover:to-cyan-400 hover:text-white transition-all"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative h-[300px] md:h-full">
          <Scene3D className="w-full h-full" />
        </div>
      </div>
    </Card>
  )
}

export function TestimonialsSectionDemo() {
  return (
    <TestimonialsSection
      title="Trusted by Industry Leaders"
      description="Join hundreds of manufacturing companies that have transformed their operations with our IIOT solutions"
      testimonials={testimonials}
    />
  )
} 