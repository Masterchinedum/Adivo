"use client";

import { Github, Twitter, Linkedin, Mail, Facebook, Instagram, MessageSquare } from "lucide-react";
import NewsletterSignup from '@/components/NewsletterSignup';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  const otherLinks = [
    { name: "Fiverr", href: "https://www.fiverr.com/masterchinedum" },
    { name: "Upwork Talent", href: "https://www.upwork.com/freelancers/~010b9d7da5077e3a55?mp_source=share" },
    { name: "Freelancer", href: "https://www.freelancer.com/u/Masterchinedum" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/masterchinedum", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/masterchinedum", label: "X (Twitter)" },
    { icon: Facebook, href: "https://facebook.com/masterchinedum", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/masterchinedum", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/in/masterchinedum", label: "LinkedIn" },
    { icon: MessageSquare, href: "https://wa.me/+2349077020150", label: "WhatsApp" },
    { icon: Mail, href: "mailto:chinedu01k@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">masterchinedum</h2>
            <p className="text-muted-foreground">
              Bridging the gap between web development and biochemistry through innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* other */}
          <div>
            <h3 className="font-semibold mb-4">Others</h3>
            <ul className="space-y-2">
              {otherLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <NewsletterSignup />
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-primary transition-colors group"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground border-t pt-8">
          <p>© {currentYear} masterchinedum. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="/privacy" className="hover:text-primary">Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
