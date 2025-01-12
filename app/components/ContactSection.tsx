"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  Calendar,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  Phone,
} from "lucide-react";

const ContactSection = () => {
  const [formState, setFormState] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [activeCard, setActiveCard] = useState<string | null>(null);

  const socialLinks = [
    { name: "GitHub", icon: <Github className="w-6 h-6" />, url: "https://github.com/masterchinedum", color: "hover:text-gray-900 dark:hover:text-gray-100" },
    { name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, url: "https://linkedin.com/in/masterchinedum", color: "hover:text-blue-600" },
    { name: "WhatsApp", icon: <Phone className="w-6 h-6" />, url: "https://wa.me/+2349077020150", color: "hover:text-green-500" },
    { name: "Facebook", icon: <Facebook className="w-6 h-6" />, url: "https://facebook.com/masterchinedum", color: "hover:text-blue-700" },
    { name: "X (Twitter)", icon: <Twitter className="w-6 h-6" />, url: "https://x.com/masterchinedum", color: "hover:text-gray-900 dark:hover:text-gray-100" },
    { name: "Instagram", icon: <Instagram className="w-6 h-6" />, url: "https://instagram.com/masterchinedum", color: "hover:text-pink-600" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const response = await fetch("/api/save-to-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error(error);
      setFormState("idle");
    }
  };

  return (
    <section className="py-20 px-4 md:px-6 relative overflow-hidden bg-gradient-to-b from-muted to-background" id="contact">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/50"></div>
        <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute left-0 bottom-0 h-96 w-96 translate-y-1/2 -translate-x-1/2 rounded-full bg-secondary/30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Let&#39;s Connect</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Whether you&#39;re interested in collaboration, have a project in mind, or just want to say hello,
          I&#39;m always open to new opportunities and connections.
        </p>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="your@email.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="What&#39;s this about?" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell me about your project or inquiry..." className="min-h-[150px]" required />
              </div>

              <Button type="submit" className="w-full" disabled={formState !== "idle"}>
                {formState === "idle" && (<><Send className="mr-2 h-4 w-4" /> Send Message</>)}
                {formState === "sending" && <span>Sending...</span>}
                {formState === "sent" && (<><CheckCircle className="mr-2 h-4 w-4" /> Message Sent</>)}
              </Button>
            </form>
          </Card>

           {/* Contact Info */}
           <div className="space-y-6">
            {/* Availability Card */}
            <Card 
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                activeCard === 'availability' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveCard(activeCard === 'availability' ? null : 'availability')}
            >
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Current Availability</h3>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Available for Projects
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Currently accepting new projects and collaborations.
                  Typical response time: 12-48 hours
                </p>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card 
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                activeCard === 'email' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveCard(activeCard === 'email' ? null : 'email')}
            >
              <CardContent className="p-0">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a 
                      href="mailto:chinedu02k@gmail.com" 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      chinedu02k@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-4">Connect with me</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg border border-border hover:border-primary transition-colors ${link.color} group`}
                      title={link.name}
                    >
                      {link.icon}
                      <span className="sr-only">{link.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;