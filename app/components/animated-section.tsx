"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    rootMargin: "-50px",
    triggerOnce: false
  })

  const variants = {
    hidden: { 
      opacity: 0,
      y: 100,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  }

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  )
} 