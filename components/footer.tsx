// components/footer.tsx
import Link from "next/link"
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Mail, 
  Phone,
  MapPin,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Tests', href: '/tests' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  social: [
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin
    },
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook
    },
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram
    }
  ],
}

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12 md:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sociolytics</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Helping people understand their relationships better through scientifically-designed psychological tests.
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <Button 
                  key={item.name} 
                  variant="ghost" 
                  size="icon"
                  className="hover:text-primary"
                  asChild
                >
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-12 xl:mt-0 xl:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Contact</h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="mailto:contact@sociolytics.com"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email Us</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="tel:+1234567890"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call Us</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>Find Us</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter Signup */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to get the latest updates
                </p>
                <form className="space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-sm rounded-md border bg-background"
                    required
                  />
                  <Button type="submit" className="w-full">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Sociolytics. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500" /> by Sociolytics Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}