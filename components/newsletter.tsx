// components/newsletter.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Send, ArrowRight, Mail as MailIcon } from "lucide-react"
import { toast } from "sonner"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Add your newsletter signup logic here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      toast.success("Thank you for subscribing!")
      setEmail("")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/50 to-white" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center max-w-6xl mx-auto"
        >
          {/* Left Column - Newsletter */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1 text-sm">
              <MailIcon className="h-4 w-4" />
              <span>Stay updated</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-500 md:text-lg">
              Get the latest insights about relationships and psychological well-being delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="sm:min-w-[300px]"
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Right Column - Contact */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4 lg:pl-8"
          >
            <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1 text-sm">
              <Send className="h-4 w-4" />
              <span>Get in touch</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter">Contact Us</h2>
            <p className="text-gray-500 md:text-lg">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <div className="space-y-4 pt-4">
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a href="mailto:contact@sociolytics.com">
                  <Mail className="h-4 w-4" />
                  contact@sociolytics.com
                </a>
              </Button>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Button 
                    key={social.name}
                    variant="ghost" 
                    size="icon"
                    className="hover:text-primary"
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-5 w-5" />
                      <span className="sr-only">{social.name}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const socialLinks = [
  {
    name: 'Twitter',
    href: '#',
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: Linkedin,
  },
  {
    name: 'Facebook',
    href: '#',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: Instagram,
  },
]