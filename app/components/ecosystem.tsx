"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Monitor, BarChart2, TrendingUp, Users } from "lucide-react"

const benefits = [
  {
    icon: Monitor,
    title: "Digital Mirror of the real production",
    description:
      "Loginware Industry 4.0 Ecosystem creates a powerful real-time software layer, bridging the gap between PLM and automation.",
  },
  {
    icon: BarChart2,
    title: "Boost efficiency and cut costs",
    description:
      "Optimize manufacturing and quality operations through digital planning and orchestration, resulting in streamlined production processes.",
  },
  {
    icon: TrendingUp,
    title: "Unleash the power of continuous improvement",
    description:
      "Transform vast amounts of big data into actionable intelligence to proactively predict and resolve issues.",
  },
  {
    icon: Users,
    title: "Transforming Workforce Empowerment",
    description:
      "Empower workers with AI and real-time sensor data, enabling informed decisions about shop floor activities.",
  },
]

export default function Ecosystem() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" variants={itemVariants}>
            Why Loginware's Industry 4.0 Ecosystem?
          </motion.h2>
          <motion.p className="text-muted-foreground max-w-3xl mx-auto" variants={itemVariants}>
            Empower your business with industry-leading Loginware's Industry 4.0 ecosystem, enabling cost-effective
            production of top-quality products at unmatched speed.
          </motion.p>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.1,
                }}
              >
                <benefit.icon className="w-12 h-12 text-primary mb-4" />
              </motion.div>
              <motion.h3 className="text-xl font-semibold mb-2" variants={itemVariants}>
                {benefit.title}
              </motion.h3>
              <motion.p className="text-muted-foreground" variants={itemVariants}>
                {benefit.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}