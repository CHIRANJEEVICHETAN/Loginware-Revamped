"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Cpu, Network, BarChart2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/app/components/animated-section"

const expertiseAreas = [
  {
    icon: Cpu,
    title: "Smart Manufacturing",
    description:
      "Revolutionize your manufacturing processes with our advanced IIoT solutions that seamlessly integrate with existing systems.",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 via-transparent to-transparent",
  },
  {
    icon: Network,
    title: "Digital Transformation",
    description:
      "Transform your operations with our comprehensive digital solutions that drive efficiency and innovation.",
    gradient: "from-indigo-500 to-indigo-600",
    bgGradient: "from-indigo-50 via-transparent to-transparent",
  },
  {
    icon: BarChart2,
    title: "Data Analytics",
    description:
      "Harness the power of data with our advanced analytics tools to make informed decisions and optimize operations.",
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 via-transparent to-transparent",
  },
  {
    icon: Zap,
    title: "Process Automation",
    description:
      "Streamline your workflows with intelligent automation solutions that boost productivity and reduce errors.",
    gradient: "from-cyan-500 to-cyan-600",
    bgGradient: "from-cyan-50 via-transparent to-transparent",
  },
]

export default function Expertise() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

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

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
          >
            Our Expertise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-600 text-lg max-w-3xl mx-auto"
          >
            Data Mastery, Industry Proficiency: Experience the Difference with Loginware's Expertise
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className={`relative p-6 rounded-xl backdrop-blur-sm bg-white/80 border border-transparent
                hover:border-${area.gradient.split('-')[1]} transition-all duration-300 group shadow-lg hover:shadow-xl`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${area.bgGradient} opacity-50 rounded-xl`} />
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
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.gradient} p-3 mb-6
                    shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                >
                  <area.icon className="w-full h-full text-white" />
                </motion.div>
                <h3 className={`text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${area.gradient}`}>
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Learn More About Our Expertise
          </Button>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

