import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-12 sm:py-24 md:py-32 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex w-full overflow-hidden group">
            <div className="flex animate-marquee group-hover:animate-marquee-pause gap-6">
              {/* First set */}
              {testimonials.map((testimonial, idx) => (
                <TestimonialCard 
                  key={`first-${idx}`}
                  {...testimonial}
                  className="shrink-0 w-[300px]"
                />
              ))}
              {/* Second set */}
              {testimonials.map((testimonial, idx) => (
                <TestimonialCard 
                  key={`second-${idx}`}
                  {...testimonial}
                  className="shrink-0 w-[300px]"
                />
              ))}
              {/* Third set to ensure seamless loop */}
              {testimonials.map((testimonial, idx) => (
                <TestimonialCard 
                  key={`third-${idx}`}
                  {...testimonial}
                  className="shrink-0 w-[300px]"
                />
              ))}
            </div>
          </div>
          
          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  )
} 