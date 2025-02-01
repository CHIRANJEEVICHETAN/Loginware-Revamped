"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cpu, Database, Gauge, Activity } from "lucide-react"
import { SplineSceneBasic } from "@/components/ui/code.demo"

const pageLoadVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
}

const floatingIcons = [
  { Icon: Cpu, x: -20, y: -15, delay: 0 },
  { Icon: Database, x: 25, y: 10, delay: 0.2 },
  { Icon: Gauge, x: -15, y: 20, delay: 0.4 },
  { Icon: Activity, x: 20, y: -10, delay: 0.6 },
]

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, -150])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"
      />
      
      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, x, y, delay }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0, 1, 0.8],
            x: [0, x * 10, x * 8],
            y: [0, y * 10, y * 8],
          }}
          transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute text-primary/30"
          style={{ left: `${50 + x}%`, top: `${50 + y}%` }}
        >
          <Icon size={32} />
        </motion.div>
      ))}

      <motion.div
        variants={pageLoadVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-32 text-center relative z-10"
        style={{ y: y2 }}
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Industry 4.0 Solutions
          </span>
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 animate-gradient-x"
        >
          Transforming Industry 4.0
          <br />
          with Smart Solutions
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience the power of EAGLE, SPARROW, and our suite of industrial IoT solutions designed for the future of
          manufacturing.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 text-white hover:opacity-90 transition-opacity text-lg group"
          >
            Explore Products
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-violet-600 text-lg hover:bg-gradient-to-r hover:from-violet-600 hover:via-blue-500 hover:to-cyan-400 hover:text-white transition-all"
          >
            Schedule Demo
          </Button>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
        >
          {[
            { label: "Active Users", value: "500+" },
            { label: "Data Points", value: "1M+" },
            { label: "Efficiency Gain", value: "40%" },
          ].map((stat, index) => (
            <div key={index} className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* 3D Scene Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <SplineSceneBasic />
        </motion.div>
      </motion.div>
    </section>
  )
}

