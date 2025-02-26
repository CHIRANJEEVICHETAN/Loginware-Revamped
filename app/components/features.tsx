"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Activity, Cpu, BarChart3, Shield, Zap, Settings } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "Smart Manufacturing",
    description: "Integrate intelligent automation and real-time monitoring for optimized production.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Make data-driven decisions with powerful analytics and visualization tools.",
  },
  {
    icon: Activity,
    title: "Cloud Integration",
    description: "Seamless cloud connectivity for remote access and data storage.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security protocols to protect your industrial data.",
  },
  {
    icon: Zap,
    title: "Real-time Performance",
    description: "Instant insights and alerts for maximum operational efficiency.",
  },
  {
    icon: Settings,
    title: "Easy Integration",
    description: "Compatible with existing systems and future-ready for scalability.",
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
      damping: 20
    }
  }
}

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Industry-Leading Features
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
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
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors"
            >
              <motion.div
                variants={iconVariants}
                className="w-12 h-12 text-primary mb-4"
              >
                <feature.icon className="w-full h-full" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

