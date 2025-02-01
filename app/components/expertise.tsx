"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Cpu, Network, BarChart2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const expertiseAreas = [
  {
    icon: Cpu,
    title: "Smart Manufacturing",
    description:
      "Revolutionize your manufacturing processes with our advanced IIoT solutions that seamlessly integrate with existing systems.",
  },
  {
    icon: Network,
    title: "Digital Transformation",
    description:
      "Transform your operations with our comprehensive digital solutions that drive efficiency and innovation.",
  },
  {
    icon: BarChart2,
    title: "Data Analytics",
    description:
      "Harness the power of data with our advanced analytics tools to make informed decisions and optimize operations.",
  },
  {
    icon: Zap,
    title: "Process Automation",
    description:
      "Streamline your workflows with intelligent automation solutions that boost productivity and reduce errors.",
  },
]

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const iconVariants = {
  hidden: { scale: 0, rotate: -45 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
}

export default function Expertise() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-grid-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="container mx-auto px-4 relative">
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
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
          >
            Our Expertise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Data Mastery, Industry Proficiency: Experience the Difference with Loginware's Expertise
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="group relative p-8 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div variants={iconVariants}>
                <area.icon className="w-12 h-12 text-primary mb-6" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-white">{area.title}</h3>
              <p className="text-gray-300">{area.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
            Learn More About Our Expertise
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

