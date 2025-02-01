"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowUpRight } from "lucide-react"

const cases = [
  {
    title: "Streamlined Production Planning with SPARROW",
    image: "/images/case-studies-streamline.jpeg",
    description: "Achieved 40% improvement in production efficiency",
    result: "40% Efficiency Boost",
  },
  {
    title: "Real-Time Data-driven Decision-making with EAGLE",
    image: "/images/case-studies-real-time.jpeg",
    description: "Reduced downtime by 60% through predictive maintenance",
    result: "60% Downtime Reduction",
  },
  {
    title: "Enhanced Quality Control with Loginware Analytics",
    image: "/images/case-studies-enhanced.jpeg",
    description: "Improved product quality rates by 45%",
    result: "45% Quality Improvement",
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

const imageVariants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-grid-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Case Studies
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            From Obstacles to Achievements: Empowering Industries with Loginware's Revolutionary Solutions
          </motion.p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((study, index) => (
            <motion.div
              key={study.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="group relative overflow-hidden border-gray-700 hover:border-primary/50 transition-all duration-300 h-full flex flex-col bg-gray-800/50 backdrop-blur-sm">
                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="absolute inset-0"
                  >
                    <Image 
                      src={study.image} 
                      alt={study.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <motion.div 
                    className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {study.result}
                  </motion.div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-primary transition-colors">
                    {study.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-300 mb-4">{study.description}</p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full group hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Read More
                      <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-blue-500 text-white group"
            >
              View All Case Studies
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

