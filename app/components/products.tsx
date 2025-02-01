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
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "EAGLE PRO",
    description: "Advanced Industrial Automation Platform",
    icon: Activity,
    features: ["Advanced analytics", "AI-powered insights", "Comprehensive control"],
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "SPARROW",
    description: "Manufacturing Operations Management",
    icon: Zap,
    features: ["Process optimization", "Quality control", "Production tracking"],
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "FeatherGauge",
    description: "Precision Measurement Solution",
    icon: Gauge,
    features: ["High accuracy", "Real-time monitoring", "Quality assurance"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "FeatherWatt",
    description: "Energy Management System",
    icon: Battery,
    features: ["Energy monitoring", "Cost optimization", "Sustainability"],
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "Eagle Vision Analytics",
    description: "Advanced Data Analytics Platform",
    icon: BarChart,
    features: ["Predictive analytics", "Visual insights", "Decision support"],
    gradient: "from-rose-500 to-cyan-500",
  },
]

export default function Products() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
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
  }

  return (
    <AnimatedSection className="py-24 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="group relative overflow-hidden border-muted bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${product.gradient}`} />
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${product.gradient}`}>
                      <product.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">{product.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.gradient}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full group" variant="outline">
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

