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
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 via-transparent to-transparent",
  },
  {
    title: "Real-Time Data-driven Decision-making with EAGLE",
    image: "/images/case-studies-real-time.jpeg",
    description: "Reduced downtime by 60% through predictive maintenance",
    result: "60% Downtime Reduction",
    gradient: "from-indigo-500 to-indigo-600",
    bgGradient: "from-indigo-50 via-transparent to-transparent",
  },
  {
    title: "Enhanced Quality Control with Loginware Analytics",
    image: "/images/case-studies-enhanced.jpeg",
    description: "Improved product quality rates by 45%",
    result: "45% Quality Improvement",
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 via-transparent to-transparent",
  },
]

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white/50 to-blue-50/50">
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
            Case Studies
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg max-w-3xl mx-auto"
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
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="group relative overflow-hidden backdrop-blur-sm bg-white/90 border border-blue-100 
                hover:border-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl h-full flex flex-col">
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <Image 
                    src={study.image} 
                    alt={study.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                  <div className={`absolute bottom-4 left-4 bg-gradient-to-r ${study.gradient} text-white 
                    px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
                    {study.result}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className={`text-xl bg-clip-text text-transparent bg-gradient-to-r ${study.gradient} group-hover:scale-105 transition-all`}>
                    {study.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 mb-6">{study.description}</p>
                  <Button 
                    className={`w-full bg-gradient-to-r ${study.gradient} text-white hover:opacity-90 transition-all duration-300 group`}
                  >
                    Read More
                    <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
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
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            View All Case Studies
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

