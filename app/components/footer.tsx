"use client"

import { Facebook, Instagram, Linkedin, PhoneIcon as WhatsApp } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Loginware</h3>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
              An industry-leading technology company at the forefront of
              delivering sophisticated and digitally transformative solutions
              for the manufacturing sector.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <WhatsApp className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="w-full">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              {["Product", "About us", "Careers", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h4 className="text-lg font-semibold mb-4">Our Products</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              {[
                "Eagle",
                "Eagle Pro",
                "Sparrow",
                "FeatherGauge",
                "FeatherWatt",
                "Vision Analytics",
              ].map((product) => (
                <li key={product}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-muted-foreground">
                <span className="font-semibold">HQ</span> | Hassan
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold">CO</span> | Bengaluru
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold">Phone:</span>
                <br />
                <a href="tel:+919916609819" className="hover:text-primary">
                  +91 9916609819
                </a>
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold">Email:</span>
                <br />
                <a
                  href="mailto:info@loginwaresofttec.com"
                  className="hover:text-primary"
                >
                  info@loginwaresofttec.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Loginware. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

