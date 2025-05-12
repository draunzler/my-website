"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from "react-icons/fa"
import Link from "next/link"
import { Timeline } from "@/components/timeline"
import { motion } from "framer-motion"
import { ContributionGraph } from "@/components/contribution-graph"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RepositoryGrid } from "@/components/repository-grid"
import { ExpertiseSection } from "@/components/expertise-section"

// DotGrid component with separate elements for light and dark mode
const DotGrid = () => {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // Only render the component after mounting to avoid hydration issues
  if (!mounted) return null;
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* LIGHT MODE ELEMENTS */}
      <div className="dark:hidden">
        {/* Light mode background */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Light mode dot grid with fading effect */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
            backgroundSize: `30px 30px`,
            backgroundPosition: `0 0`,
            mask: `radial-gradient(circle at center, rgba(0, 0, 0, 0.65) 0%, transparent 100%)`,
            WebkitMask: `radial-gradient(circle at center, rgba(0, 0, 0, 0.65) 0%, transparent 100%)`
          }}
        />
      </div>
      
      {/* DARK MODE ELEMENTS */}
      <div className="hidden dark:block">
        {/* Dark mode background with specific #020618 color */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: "#020618" }}
        />
        
        {/* Dark mode dot grid with fading effect */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: `30px 30px`,
            backgroundPosition: `0 0`,
            mask: `radial-gradient(circle at center, rgba(255, 255, 255, 0.65) 0%, transparent 100%)`,
            WebkitMask: `radial-gradient(circle at center, rgba(255, 255, 255, 0.65) 0%, transparent 100%)`
          }}
        />
      </div>
    </div>
  );
};

export default function Home() {
  // No need for the previous effect as we're handling theme changes directly in the DotGrid component

  return (
    <div className="container relative mx-auto px-4">
      {/* Hero Section with dot grid background */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center overflow-hidden bg-transparent">
        {/* Dot grid background */}
        <DotGrid />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-1"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Hi, I'm <motion.span 
              className="text-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            >Arijit Saha</motion.span>
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-3xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            FARM Stack Developer & Software Architect
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Specializing in building scalable applications with FastAPI, React and MongoDB.
            Expert in LangChain development and modern software architecture.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a href="#contact">
              <Button size="lg" className="hover:scale-105 transition-transform">
                <FaEnvelope className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
            </a>
            <Link href="https://github.com/draunzler" target="_blank">
              <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
                <FaGithub className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/draunzler" target="_blank">
              <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
                <FaLinkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <ExpertiseSection />

      {/* Journey Section */}
      <section className="py-16">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          My Journey
        </motion.h2>
        <div className="max-w-5xl mx-auto">
          <Timeline />
        </div>
      </section>

      {/* GitHub Section */}
      <section className="py-16">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          GitHub Activity
        </motion.h2>
        <motion.div 
          className="space-y-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-6">
            <ContributionGraph username="draunzler" />
          </Card>

          <div>
            <motion.h3
              className="text-2xl font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Featured Repositories
            </motion.h3>
            <RepositoryGrid username="draunzler" />
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Get in Touch
        </motion.h2>
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card>
            <CardContent className="p-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Your message" className="min-h-[150px]" />
                </div>
                <Button className="w-full">
                  <FaPaperPlane className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}