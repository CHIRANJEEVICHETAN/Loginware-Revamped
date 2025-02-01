"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Activity, Cpu, BarChart3, Shield, Zap, Settings } from "lucide-react"
import { AnimatedSection } from "@/app/components/animated-section"

const features = [
  {
    icon: Cpu,
    title: "Smart Manufacturing",
    description: "Integrate intelligent automation and real-time monitoring for optimized production.",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 via-transparent to-transparent",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Make data-driven decisions with powerful analytics and visualization tools.",
    gradient: "from-indigo-500 to-indigo-600",
    bgGradient: "from-indigo-50 via-transparent to-transparent",
  },
  {
    icon: Activity,
    title: "Cloud Integration",
    description: "Seamless cloud connectivity for remote access and data storage.",
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 via-transparent to-transparent",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security protocols to protect your industrial data.",
    gradient: "from-cyan-500 to-cyan-600",
    bgGradient: "from-cyan-50 via-transparent to-transparent",
  },
  {
    icon: Zap,
    title: "Real-time Performance",
    description: "Instant insights and alerts for maximum operational efficiency.",
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50 via-transparent to-transparent",
  },
  {
    icon: Settings,
    title: "Easy Integration",
    description: "Compatible with existing systems and future-ready for scalability.",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 via-transparent to-transparent",
  },
]

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <section id="features" className="relative py-24 overflow-hidden bg-gradient-to-b from-white/50 to-blue-50/50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-blue-50/20 backdrop-blur-[0.5px]" />
        
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Industry-Leading Features
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our comprehensive suite of features empowers your industrial operations with cutting-edge technology.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="relative p-6 rounded-xl backdrop-blur-sm bg-white/90 border border-blue-100 
                hover:border-blue-200 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-50 rounded-xl`} />
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: index * 0.1 
                  }}
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6
                    shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </motion.div>
                <h3 className={`text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${feature.gradient}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

