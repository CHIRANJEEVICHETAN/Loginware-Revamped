"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./theme-toggle"

const products = [
  { 
    name: "Eagle", 
    href: "#", 
    description: "Edge Computing Device",
    icon: "🦅"
  },
  { 
    name: "Eagle Pro", 
    href: "#", 
    description: "Advanced Automation Platform",
    icon: "⚡"
  },
  { 
    name: "Sparrow", 
    href: "#", 
    description: "Manufacturing Operations",
    icon: "🔧"
  },
  { 
    name: "FeatherGauge", 
    href: "#", 
    description: "Precision Measurement",
    icon: "📊"
  },
  { 
    name: "FeatherWatt", 
    href: "#", 
    description: "Energy Management",
    icon: "⚡"
  },
  { 
    name: "Eagle Vision Analytics", 
    href: "#", 
    description: "Data Analytics Platform",
    icon: "📈"
  },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link href="/" className="relative group">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Loginware
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all hover:shadow-lg hover:shadow-blue-500/20">
                  Products
                  <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="center" 
                className="w-[350px] p-4 backdrop-blur-md bg-white/95 shadow-xl border border-blue-100 rounded-xl"
              >
                <div className="mb-2 px-2">
                  <h3 className="text-sm font-medium text-gray-400">Our Solutions</h3>
                </div>
                <div className="grid gap-2">
                  {products.map((product) => (
                    <DropdownMenuItem key={product.name} asChild>
                      <Link 
                        href={product.href}
                        className="flex items-start gap-4 p-3 hover:bg-blue-50 rounded-lg transition-all hover:shadow-md group"
                      >
                        <div className="mt-1 text-xl">{product.icon}</div>
                        <div className="flex-1">
                          <span className="font-semibold text-blue-900 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </span>
                          <span className="block text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                            {product.description}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Regular Navigation Buttons */}
            <Button 
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all hover:shadow-lg hover:shadow-blue-500/20"
            >
              <Link href="#about">About Us</Link>
            </Button>

            <Button 
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all hover:shadow-lg hover:shadow-blue-500/20"
            >
              <Link href="#careers">Careers</Link>
            </Button>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 ml-4">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                Schedule Demo
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                Contact Us
              </Button>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden"
          >
            <div className="p-4 space-y-3">
              {/* Mobile menu items */}
              {/* Add your mobile menu items here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

