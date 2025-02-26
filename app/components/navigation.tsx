"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "./theme-toggle"

const products = [
  { name: "Eagle", href: "#" },
  { name: "Eagle Pro", href: "#" },
  { name: "Sparrow", href: "#" },
  { name: "FeatherGauge", href: "#" },
  { name: "FeatherWatt", href: "#" },
  { name: "Eagle Vision Analytics", href: "#" },
]

export default function Navigation() {
  const [showProducts, setShowProducts] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/50 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          Loginware
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setShowProducts(true)}
            onMouseLeave={() => setShowProducts(false)}
          >
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              Products
              <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {showProducts && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-64 bg-background/90 backdrop-blur-md rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="py-2">
                    {products.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="block px-4 py-2 hover:bg-primary/20 transition-colors"
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="#about" className="hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="#careers" className="hover:text-primary transition-colors">
            Careers
          </Link>
          <Button
            asChild
            className="bg-gradient-to-r from-primary to-blue-500 text-white hover:opacity-90 transition-opacity"
          >
            <Link href="#contact">Schedule Demo</Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-primary to-blue-500 text-white hover:opacity-90 transition-opacity"
          >
            <Link href="#contact">Contact Us</Link>
          </Button>
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-2xl font-bold">
                  Loginware
                </Link>
                <div>
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="flex items-center justify-between w-full px-4 py-2 hover:bg-primary/20 transition-colors"
                  >
                    Products
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {products.map((product) => (
                          <Link
                            key={product.name}
                            href={product.href}
                            className="block px-8 py-2 hover:bg-primary/20 transition-colors"
                          >
                            {product.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link href="#about" className="px-4 py-2 hover:bg-primary/20 transition-colors">
                  About Us
                </Link>
                <Link href="#careers" className="px-4 py-2 hover:bg-primary/20 transition-colors">
                  Careers
                </Link>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-blue-500 text-white hover:opacity-90 transition-opacity m-4"
                >
                  <Link href="#contact">Schedule Demo</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-blue-500 text-white hover:opacity-90 transition-opacity m-4"
                >
                  <Link href="#contact">Contact Us</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

