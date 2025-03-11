"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { ArrowRight, LinkIcon, Database, Play, BarChart3, Gauge, Cloud, Cpu, Sparkles, CircuitBoard } from 'lucide-react'
import { AnimatedSection } from "@/app/components/animated-section"
import Navigation from "@/app/components/navigation"
import Footer from "@/app/components/footer"
import Image from "next/image"
import CustomCursor from "@/app/components/custom-cursor"

const features = [
  {
    title: "Remote Monitoring and Control",
    description: "EAGLE enables remote monitoring and control of manufacturing machines. This feature allows manufacturers to access and manage machines from anywhere, eliminating the need for physical presence on the shop floor",
    icon: Cloud,
    gradient: "from-emerald-500 to-teal-500",
    image: "/images/remote.jpeg"
  },
  {
    title: "Seamless Connectivity",
    description: "EAGLE seamlessly connects and controls various manufacturing machines, including CNC and sensors, facilitating efficient data gathering and analysis.",
    icon: LinkIcon,
    gradient: "from-teal-500 to-emerald-500",
    image: "/images/seamless.jpeg"
  },
  {
    title: "Real-time Data Gathering",
    description: "EAGLE effortlessly collects vital information directly from the machines, ensuring accurate and up-to-date insights into production processes",
    icon: Database,
    gradient: "from-emerald-500 to-teal-500",
    image: "/images/real time.jpg"
  },
]

const metrics = [
  { label: "Efficiency Increase", value: "40%", icon: BarChart3 },
  { label: "Downtime Reduction", value: "65%", icon: Gauge },
  { label: "Data Accuracy", value: "99.9%", icon: Cpu },
]

export default function Eagle() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-sky-50/5 to-white dark:from-gray-950 dark:via-sky-900/5 dark:to-gray-900 transition-all duration-500">
      {/* Enhanced background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_65%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
      <CustomCursor />
      {/* Background Pattern - Only visible in dark mode */}
      <div className="fixed inset-0 bg-repeat opacity-0 dark:opacity-[0.02] pointer-events-none transition-opacity duration-500" 
           style={{ 
             backgroundImage: `url(${encodeURI("/images/eagle.png")})`,
             backgroundSize: '600px'
           }} />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl"
        />
      </div>

      <Navigation />
      
      {/* Hero Section */}
      <AnimatedSection className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-12">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/30 via-blue-100/20 to-transparent dark:from-sky-900/30 dark:via-blue-900/20 dark:to-transparent opacity-80 transition-colors duration-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.3),transparent_50%)] transition-colors duration-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.3),transparent_50%)] transition-colors duration-500" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="backdrop-blur-sm bg-white/70 dark:bg-gray-950/30 p-10 rounded-3xl border border-sky-400/10 shadow-2xl transition-all duration-500 hover:shadow-sky-400/10 hover:border-sky-400/20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h1 className="text-7xl md:text-9xl font-bold mb-8 relative tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-400">
                      EAGLE
                    </span>
                    <div className="absolute -inset-2 bg-sky-400/10 rounded-lg blur-2xl -z-10" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -right-4 -top-4"
                    >
                      <Sparkles className="w-8 h-8 text-sky-400" />
                    </motion.div>
                  </h1>
                  <p className="text-2xl md:text-4xl font-medium mb-4 bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                    The Intelligent IoT Gateway
                  </p>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl transition-colors duration-500">
                    Unlocking Manufacturing's Edge Computing Advantage for Limitless Possibilities
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-sky-400 to-blue-400 hover:from-sky-500 hover:to-blue-500 text-white border-0 shadow-lg hover:shadow-sky-400/20 transition-all duration-300 group"
                    >
                      Request a Demo
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="backdrop-blur-sm bg-white/5 border-sky-400/20 hover:bg-white/10 hover:border-sky-400/30 text-sky-400 transition-all duration-300 group"
                    >
                      Watch Video
                      <Play className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-[700px] w-full hidden md:block transform hover:scale-105 transition-transform duration-700"
            >
              {/* Decorative Elements */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-blue-400/10 rounded-full -z-10 blur-2xl"
              />
              
              {/* Circuit Board Pattern */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="absolute"
                    style={{
                      top: `${20 + (i * 15)}%`,
                      left: `${10 + (i * 5)}%`,
                    }}
                  >
                    <CircuitBoard className="w-8 h-8 text-sky-400" />
                  </motion.div>
                ))}
              </div>

              {/* Main Image */}
              <motion.div 
                className="relative h-full w-full"
                initial={{ rotateY: -20 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ perspective: 1000 }}
              >
                <Image
                  src="/images/eagle.png"
                  alt="EAGLE IoT Gateway Interface"
                  fill
                  className="object-contain rounded-3xl filter drop-shadow-2xl"
                  style={{
                    filter: "brightness(1.2) contrast(1.1) saturate(1.1)",
                    transform: "translateZ(50px) rotateY(-5deg)",
                  }}
                  priority
                />
                
                {/* Glowing Effect */}
                <motion.div
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-3xl blur-xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-50/50 to-transparent dark:from-transparent dark:via-sky-950/10 dark:to-transparent transition-colors duration-500" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
              Key Features
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto transition-colors duration-500">
              Discover how EAGLE transforms your manufacturing operations with its powerful features
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="h-full"
              >
                <Card className="relative overflow-hidden border-0 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm hover:shadow-xl hover:bg-white/80 dark:hover:bg-gray-900/60 transition-all duration-300 group h-full flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400/5 to-blue-400/5" />
                  <CardContent className="pt-6 relative flex flex-col flex-1">
                    <div className="relative w-full h-52 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-gradient-to-br from-sky-400 to-blue-400 w-fit">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white min-h-[56px] flex items-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 flex-1 transition-colors duration-500">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Metrics Section */}
      <AnimatedSection className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
            Performance Metrics
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-blue-400/10 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
                <div className="relative">
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-sky-400/10 to-blue-400/10 dark:from-sky-400/20 dark:to-blue-400/20 mb-4">
                    <metric.icon className="w-8 h-8 text-sky-500 dark:text-sky-400" />
                  </div>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {metric.value}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{metric.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-sky-50/50 to-transparent dark:from-sky-950/10 dark:to-transparent transition-colors duration-500" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Transform Your Manufacturing?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-500">
              Get in touch with our team to schedule a demo and see how EAGLE can revolutionize your operations.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-sky-400 to-blue-400 hover:from-sky-500 hover:to-blue-500 text-white border-0 shadow-lg hover:shadow-sky-400/20 transition-all duration-300"
            >
              Request a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  )
}