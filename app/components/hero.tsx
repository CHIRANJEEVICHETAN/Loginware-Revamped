"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cpu, Database, Gauge, Activity, ChevronDown, BarChart, Brain, Cloud, Shield } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SceneWrapper from "./scene3d"
import { Suspense } from "react"
import Link from "next/link"

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

const productOptions = [
  {
    name: "EAGLE",
    description: "Edge Computing Device",
    icon: Cpu,
  },
  {
    name: "EAGLE PRO",
    description: "Advanced Automation Platform",
    icon: Gauge,
  },
  {
    name: "SPARROW",
    description: "Manufacturing Operations",
    icon: Database,
  },
  {
    name: "FeatherGauge",
    description: "Precision Measurement",
    icon: Activity,
  },
]

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, -150])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/50 to-blue-50/50">
      {/* 3D Scene Background */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <SceneWrapper />
        </Suspense>
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-blue-50/20 backdrop-blur-[0.5px] z-[1]" />
      
      {/* Enhanced animated background elements */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-[2]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f7ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f7ff_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/10 to-transparent" />
      </motion.div>
      
      {/* Animated circles in background */}
      <div className="absolute inset-0 overflow-hidden z-[2]">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-200/20"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Floating Icons with enhanced animation */}
      {floatingIcons.map(({ Icon, x, y, delay }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0, 1, 0.8],
            x: [0, x * 10, x * 8],
            y: [0, y * 10, y * 8],
            rotate: [0, x * 2, -x * 2],
          }}
          transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute text-blue-500/30"
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
        {/* Enhanced badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="px-8 py-3 rounded-full bg-blue-100/70 text-blue-600 text-sm font-semibold backdrop-blur-sm border border-blue-200/50 shadow-lg inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Industry 4.0 Solutions
          </span>
        </motion.div>

        {/* Enhanced heading with stronger gradient and shadow */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 animate-gradient-x drop-shadow-lg tracking-tight"
        >
          Transforming Industry 4.0
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
            with Smart Solutions
          </span>
        </motion.h1>

        {/* Enhanced description */}
        <motion.p 
          variants={itemVariants} 
          className="text-xl md:text-2xl text-gray-600/90 mb-10 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Experience the power of <span className="text-blue-600 font-semibold">EAGLE</span>, 
          <span className="text-blue-600 font-semibold"> SPARROW</span>, and our suite of industrial IoT solutions 
          designed for the future of manufacturing.
        </motion.p>

        {/* Enhanced stats section */}
        <motion.div 
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
        >
          {[
            { 
              label: "Active Users", 
              value: "500+",
              description: "Trusted by industry leaders"
            },
            { 
              label: "Data Points", 
              value: "1M+",
              description: "Processed daily"
            },
            { 
              label: "Efficiency Gain", 
              value: "40%",
              description: "Average improvement"
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-blue-100 hover:border-blue-200 transition-all group"
            >
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 mb-2">
                {stat.value}
              </div>
              <div className="text-base font-semibold text-blue-900/80 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature badges in organized grid */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 justify-items-center">
            {[
              {
                title: "Real-time Analytics",
                icon: <BarChart className="w-4 h-4" />,
                color: "from-blue-500 to-blue-600",
                lightColor: "bg-blue-50",
              },
              {
                title: "Edge Computing",
                icon: <Cpu className="w-4 h-4" />,
                color: "from-indigo-500 to-indigo-600",
                lightColor: "bg-indigo-50",
              },
              {
                title: "AI-Powered",
                icon: <Brain className="w-4 h-4" />,
                color: "from-purple-500 to-purple-600",
                lightColor: "bg-purple-50",
              },
              {
                title: "Cloud Integration",
                icon: <Cloud className="w-4 h-4" />,
                color: "from-cyan-500 to-cyan-600",
                lightColor: "bg-cyan-50",
              },
              {
                title: "Secure Platform",
                icon: <Shield className="w-4 h-4" />,
                color: "from-emerald-500 to-emerald-600",
                lightColor: "bg-emerald-50",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.5 + index * 0.1,
                  duration: 0.5,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${feature.lightColor} 
                  backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl
                  transition-all duration-300 group cursor-default`}
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.color} 
                  shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <span className="text-white">
                    {feature.icon}
                  </span>
                </div>
                <span className="font-medium text-gray-700">
                  {feature.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

