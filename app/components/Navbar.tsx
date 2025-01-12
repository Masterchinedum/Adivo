// app/components/Navbar.tsx

"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Linkedin, Github, Facebook, Twitter, MessageCircle, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import masterdark  from "@/app/assets/masterdark.png";
import masterwhite  from "@/app/assets/masterwhite.png";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const navLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Projects', href: '/#projects' },
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/in/masterchinedum', 
      icon: <Linkedin className="w-5 h-5" />
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/masterchinedum', 
      icon: <Github className="w-5 h-5" />
    },
    { 
      name: 'WhatsApp', 
      href: 'https://wa.me/+2349077020150', 
      icon: <MessageCircle className="w-5 h-5" />
    },
    { 
      name: 'X (Twitter)', 
      href: 'https://x.com/masterchinedum', 
      icon: <Twitter className="w-5 h-5" />
    },
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/masterchinedum', 
      icon: <Facebook className="w-5 h-5" />
    },
  ];

  const ThemeToggle = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="fixed top-0 w-full backdrop-blur-md bg-white/75 dark:bg-gray-900/75 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={theme === 'dark' ? masterdark : masterwhite}
                alt="Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Nav Links */}
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Desktop Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Theme Toggle */}
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 px-3 py-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}