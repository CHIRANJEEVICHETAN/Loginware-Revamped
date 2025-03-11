"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Cpu, Shield, Zap, Play, BarChart3, Gauge } from "lucide-react"
import { AnimatedSection } from "@/app/components/animated-section"
import CustomCursor from "@/app/components/custom-cursor"
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";



const features = [
  {
    title: "Data Acquisition & Preprocessing",
    description: "Seamlessly extract and preprocess data from diverse manufacturing assets, transforming raw data into actionable insights.",
    icon: Cpu,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Flexible Data Integration",
    description: "Transform data into MES, ERP Database & Cloud solutions with smart data preprocessing capabilities.",
    icon: Shield,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Real-time Monitoring",
    description: "Advanced monitoring, alert and notification system for immediate response to production changes and issues.",
    icon: Zap,
    gradient: "from-rose-500 to-red-500",
  },
]

const specifications = [
  { label: "Display", value: "10\" Touch Display", icon: BarChart3 },
  { label: "Memory", value: "8/16 GB RAM", icon: Gauge },
  { label: "Connectivity", value: "WIFI + Ethernet", icon: Cpu },
  { label: "I/O", value: "10 Digital Inputs", icon: Shield },
  { label: "Outputs", value: "5 Digital Outputs", icon: Zap },
  { label: "Communication", value: "RS485 Port", icon: BarChart3 },
]

const metrics = [
  { label: "Data Processing Speed", value: "10ms", icon: Zap },
  { label: "Uptime Reliability", value: "99.9%", icon: Shield },
  { label: "Connection Capacity", value: "100+", icon: Cpu },
  { label: "Analytics Throughput", value: "1TB/day", icon: BarChart3 },
]

const benefits = [
  {
    title: "Cost Reduction",
    description: "Reduce total cost of ownership with a single platform for data acquisition and analytics.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Paperless Manufacturing",
    description: "Transform into a paperless manufacturing facility with digital data collection and processing.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Enhanced Efficiency",
    description: "Improve decision-making with real-time data availability and comprehensive analytics.",
    gradient: "from-rose-500 to-red-500",
  },
]

export default function EaglePro() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 p-10">
      <CustomCursor />
      <Navigation />
      {/* Hero Section */}
      <AnimatedSection className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
              The Intelligent IIOT Gateway
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Data Procuring and Analytics - Seamlessly extracting data from
              diverse assets, our platform transforms it into actionable
              insights, empowering informed decision-making.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                Request Enterprise Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Overview
                <Play className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="relative overflow-hidden border-muted bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-br ${feature.gradient}" />
                  <CardContent className="pt-6">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-br ${feature.gradient} w-fit mb-4`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
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
      <AnimatedSection className="py-24 bg-gradient-to-b from-background/50 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Enterprise Performance
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                  <metric.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold text-primary mb-2">
                  {metric.value}
                </h3>
                <p className="text-muted-foreground">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready for Enterprise-Grade Manufacturing?
            </h2>
            <p className="text-muted-foreground mb-8">
              Contact our enterprise sales team to learn how EAGLE PRO can
              transform your manufacturing operations.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              Contact Enterprise Sales
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  );
}