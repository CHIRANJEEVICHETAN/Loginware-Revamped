"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cpu, Gauge, Zap, Activity, Battery, BarChart } from "lucide-react"
import { AnimatedSection } from "@/app/components/animated-section"

const products = [
  {
    name: "EAGLE",
    description: "Edge Computing Device for Industrial IoT",
    icon: Cpu,
    features: ["Real-time monitoring", "Edge computing", "Data collection"],
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 via-transparent to-transparent",
  },
  {
    name: "EAGLE PRO",
    description: "Advanced Industrial Automation Platform",
    icon: Activity,
    features: ["Advanced analytics", "AI-powered insights", "Comprehensive control"],
    gradient: "from-indigo-500 to-indigo-600",
    bgGradient: "from-indigo-50 via-transparent to-transparent",
  },
  {
    name: "SPARROW",
    description: "Manufacturing Operations Management",
    icon: Zap,
    features: ["Process optimization", "Quality control", "Production tracking"],
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 via-transparent to-transparent",
  },
  {
    name: "FeatherGauge",
    description: "Precision Measurement Solution",
    icon: Gauge,
    features: ["High accuracy", "Real-time monitoring", "Quality assurance"],
    gradient: "from-cyan-500 to-cyan-600",
    bgGradient: "from-cyan-50 via-transparent to-transparent",
  },
  {
    name: "FeatherWatt",
    description: "Energy Management System",
    icon: Battery,
    features: ["Energy monitoring", "Cost optimization", "Sustainability"],
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50 via-transparent to-transparent",
  },
  {
    name: "Eagle Vision Analytics",
    description: "Advanced Data Analytics Platform",
    icon: BarChart,
    features: ["Predictive analytics", "Visual insights", "Decision support"],
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 via-transparent to-transparent",
  },
]

export default function Products() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Background animation variants
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5, transition: { duration: 1 } }
  }

  return (
    <AnimatedSection className="relative py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f7ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f7ff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25" />
        
        {/* Animated Circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-30"
            style={{
              background: `linear-gradient(to right, #60a5fa, #3b82f6)`,
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              variants={{
                hidden: { 
                  opacity: 0,
                  y: 20,
                  scale: 0.95
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 100
                  }
                }
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card className={`relative overflow-hidden backdrop-blur-sm bg-white/80 border-transparent hover:border-${product.gradient.split('-')[1]} transition-all duration-300 group`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${product.bgGradient} opacity-50`} />
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${product.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <product.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-xl bg-clip-text text-transparent bg-gradient-to-r ${product.gradient}`}>
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {product.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-600">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.gradient}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full bg-gradient-to-r ${product.gradient} text-white hover:opacity-90 transition-all duration-300 group`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

