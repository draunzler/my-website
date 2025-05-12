"use client"

import * as React from "react"
import { motion, useAnimation, AnimatePresence, useSpring, Variants } from "framer-motion"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Card } from "./ui/card"
import { 
  FaReact, 
  FaDatabase, 
  FaServer, 
  FaCode, 
  FaCloud, 
  FaMicrochip,
  FaBrain,
  FaRobot,
  FaCogs,
  FaTools,
  FaNetworkWired,
  FaChartLine,
  FaLayerGroup,
  FaProjectDiagram,
  FaRocket,
  FaUserCog,
  FaSitemap,
  FaShieldAlt,
  FaArrowRight
} from "react-icons/fa"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

interface ExpertiseItem {
  title: string
  description: string
  icon: React.ReactNode
  skills: string[]
  workflow: {
    icon: React.ReactNode
    title: string
    description: string
  }[]
}

const expertiseData: ExpertiseItem[] = [
  {
    title: "FARM Stack Development",
    description: "Full-stack web development with FastAPI, React, and MongoDB",
    icon: <FaLayerGroup className="w-8 h-8" />,
    skills: ["React.js", "FastAPI", "MongoDB", "Mobx", "TypeScript", "Material UI", "Tailwind CSS", "Docker", "Shadcn UI"],
    workflow: [
      {
        icon: <FaCode className="w-6 h-6" />,
        title: "API Design with FastAPI",
        description: "RESTful API development with modern Python"
      },
      {
        icon: <FaDatabase className="w-6 h-6" />,
        title: "Database Schema",
        description: "Efficient MongoDB data modeling"
      },
      {
        icon: <FaReact className="w-6 h-6" />,
        title: "React Architecture",
        description: "Component-based UI development"
      },
      {
        icon: <FaSitemap className="w-6 h-6" />,
        title: "State Management",
        description: "Global state and data flow"
      },
      {
        icon: <FaNetworkWired className="w-6 h-6" />,
        title: "API Integration",
        description: "Seamless frontend-backend connection"
      },
      {
        icon: <FaRocket className="w-6 h-6" />,
        title: "Deployment",
        description: "Cloud deployment and scaling"
      }
    ]
  },
  {
    title: "Software Architecture",
    description: "System design & scalable architecture solutions",
    icon: <FaProjectDiagram className="w-8 h-8" />,
    skills: ["Microservices", "Docker", "GCP", "Azure", "API Gateway", "Event-Driven Architecture"],
    workflow: [
      {
        icon: <FaUserCog className="w-6 h-6" />,
        title: "Requirements Analysis",
        description: "Understanding system needs"
      },
      {
        icon: <FaCogs className="w-6 h-6" />,
        title: "System Design",
        description: "Scalable architecture planning"
      },
      {
        icon: <FaMicrochip className="w-6 h-6" />,
        title: "Microservices",
        description: "Distributed system design"
      },
      {
        icon: <FaServer className="w-6 h-6" />,
        title: "API Gateway",
        description: "Centralized API management"
      },
      {
        icon: <FaCloud className="w-6 h-6" />,
        title: "Cloud Architecture",
        description: "Cloud-native solutions"
      },
      {
        icon: <FaChartLine className="w-6 h-6" />,
        title: "Performance",
        description: "System optimization"
      }
    ]
  },
  {
    title: "LangChain Expert",
    description: "AI & language model integration specialist",
    icon: <FaBrain className="w-8 h-8" />,
    skills: ["LangChain", "OpenAI", "GPT-4", "Gemini", "RAG", "Vector Databases", "Embedding Models", "Prompt Engineering", "Google CSE", "BeautifulSoup"],
    workflow: [
      {
        icon: <FaRobot className="w-6 h-6" />,
        title: "LLM Integration",
        description: "Custom AI model implementation"
      },
      {
        icon: <FaCode className="w-6 h-6" />,
        title: "Prompt Engineering",
        description: "Optimized AI interactions"
      },
      {
        icon: <FaProjectDiagram className="w-6 h-6" />,
        title: "Chain Development",
        description: "Complex AI workflow creation"
      },
      {
        icon: <FaDatabase className="w-6 h-6" />,
        title: "Memory Management",
        description: "Efficient context handling"
      },
      {
        icon: <FaTools className="w-6 h-6" />,
        title: "Tool Integration",
        description: "External tool connectivity"
      },
      {
        icon: <FaShieldAlt className="w-6 h-6" />,
        title: "Security & Output",
        description: "Safe AI interaction handling"
      }
    ]
  }
]

// Fluid background animation that uses theme colors
const FluidBackground = ({ active }: { active: boolean }) => {
  return (
    <motion.div 
      className="absolute inset-0 rounded-2xl overflow-hidden z-0"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: active ? 0.07 : 0
      }}
      transition={{ duration: 0.8 }}
    >
      <svg width="100%" height="100%">
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          className="fill-primary/20"
          initial={{ 
            borderRadius: "30%",
            scale: 1,
            x: "0%",
            y: "0%",
          }}
          animate={{ 
            borderRadius: ["30%", "60%", "40%", "70%", "30%"],
            scale: [1, 1.05, 0.95, 1.05, 1],
            x: ["0%", "2%", "-2%", "1%", "0%"],
            y: ["0%", "-2%", "1%", "-1%", "0%"],
          }}
          transition={{ 
            repeat: Infinity,
            repeatType: "mirror",
            duration: 15,
            ease: "easeInOut"
          }}
        />
      </svg>
    </motion.div>
  )
}

const WorkflowStep = ({ 
  step, 
  stepIndex, 
  totalSteps, 
  isActive 
}: { 
  step: ExpertiseItem["workflow"][0]; 
  stepIndex: number; 
  totalSteps: number;
  isActive: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const scale = useSpring(1, { stiffness: 300, damping: 20 })
  
  useEffect(() => {
    if (isHovered) scale.set(1.05)
    else scale.set(1)
  }, [isHovered, scale])

  const progressTime = isActive ? (stepIndex + 1) * 0.5 : 0

  return (
    <motion.div 
      className="relative"
      style={{ scale }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
      transition={{ duration: 0.5, delay: isActive ? stepIndex * 0.1 : 0 }}
    >
      <motion.div 
        className={`rounded-lg border backdrop-blur-sm ${isHovered ? 'border-primary/70 bg-primary/5 shadow-lg' : ''}`}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              {step.icon}
            </div>
            <div>
              <h4 className="font-medium">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Connector line */}
      {stepIndex < totalSteps - 1 && (
        <div className="hidden md:block">
          <motion.div
            className="absolute h-0.5 bg-primary/40 right-0 top-1/2"
            style={{ 
              width: '2rem', 
              transform: 'translateX(100%)',
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ 
              scaleX: isActive ? 1 : 0
            }}
            transition={{ 
              duration: 0.4, 
              delay: isActive ? progressTime : 0 
            }}
          />
          <motion.div
            className="absolute right-0 top-1/2 w-2 h-2 rounded-full bg-primary"
            style={{ 
              transform: 'translate(calc(100% + 2rem - 4px), -50%)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: isActive ? 1 : 0 }}
            transition={{ 
              duration: 0.2, 
              delay: isActive ? progressTime + 0.4 : 0
            }}
          />
        </div>
      )}
    </motion.div>
  )
}

export function ExpertiseSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })
  
  const [activeExpertise, setActiveExpertise] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isWorkflowView, setIsWorkflowView] = useState(false)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  // Auto-rotate through expertise items
  useEffect(() => {
    if (!isExpanded) {
      const interval = setInterval(() => {
        setActiveExpertise((prev) => (prev + 1) % expertiseData.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isExpanded])

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <div ref={ref} className="py-16 relative">
      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      
      {/* Floating decorative elements that use theme colors */}
      <motion.div
        className="absolute w-24 h-24 top-10 left-0 opacity-20 hidden md:block"
        style={{ rotate: 15, zIndex: -1 }}
        animate={{ 
          y: [0, 15, 0],
          rotate: [15, 20, 15],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 6, 
          ease: "easeInOut" 
        }}
      >
        <FaCode size={30} className="absolute top-0 left-0 text-primary" />
        <FaDatabase size={25} className="absolute bottom-0 right-0 text-primary" />
        <FaServer size={20} className="absolute top-10 right-5 text-primary" />
      </motion.div>
      
      <motion.div
        className="absolute w-24 h-24 top-20 right-0 opacity-20 hidden md:block"
        style={{ rotate: -10, zIndex: -1 }}
        animate={{ 
          y: [0, -15, 0],
          rotate: [-10, -15, -10],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 7, 
          ease: "easeInOut" 
        }}
      >
        <FaReact size={30} className="absolute top-0 right-0 text-primary" />
        <FaMicrochip size={25} className="absolute bottom-0 left-0 text-primary" />
        <FaRobot size={20} className="absolute top-10 left-5 text-primary" />
      </motion.div>
      
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary"
        variants={headingVariants}
        initial="hidden"
        animate={controls}
      >
        Core Expertise
      </motion.h2>
      
      <motion.p
        className="text-center text-muted-foreground mb-12 max-w-lg mx-auto"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, delay: 0.2 }
          }
        }}
        initial="hidden"
        animate={controls}
      >
        Specialized technical skills and development workflows that drive powerful solutions
      </motion.p>
      
      <div className="max-w-5xl mx-auto relative">
        {/* Expertise Cards */}
        <motion.div 
          className="grid grid-cols-1 gap-6 relative"
          layout
          transition={{ duration: 0.5, type: "spring", stiffness: 150, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            {expertiseData.map((item, index) => {
              const isActive = isExpanded ? true : index === activeExpertise
              
              return (
                <motion.div
                  key={item.title}
                  className={`relative ${!isExpanded && index !== activeExpertise ? 'hidden' : ''}`}
                  initial={isExpanded ? { opacity: 0, y: 50 } : { opacity: 0, x: 100 }}
                  animate={isActive ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, x: 100 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 14 }}
                  layout
                >
                  <Card className="overflow-hidden transition-all duration-300 backdrop-blur-sm">
                    {/* Theme-compliant background animation */}
                    <FluidBackground active={isActive} />
                    
                    <div className="p-6 z-10 relative">
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                          {/* Icon with theme colors */}
                          <motion.div
                            className="rounded-2xl w-16 h-16 flex items-center justify-center bg-primary/10 text-primary"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            {item.icon}
                          </motion.div>
                          
                          {/* Title and Description */}
                          <div className="flex-1 text-center md:text-left">
                            <motion.h3 
                              className="text-2xl font-semibold mb-2"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                            >
                              {item.title}
                            </motion.h3>
                            <motion.p 
                              className="text-muted-foreground mb-4"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                            >
                              {item.description}
                            </motion.p>
                            
                            {/* Skills Badges with theme styling */}
                            <motion.div 
                              className="flex flex-wrap gap-2 mt-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.5 }}
                            >
                              {item.skills.map((skill) => (
                                <TooltipProvider key={skill}>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Badge 
                                        variant="outline" 
                                        className="backdrop-blur-sm hover:bg-primary/10 border-primary/30 transition-colors"
                                      >
                                        {skill}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Expertise in {skill}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ))}
                            </motion.div>
                          </div>
                          
                          {/* Toggle Button (visible on non-expanded view) */}
                          {!isExpanded && (
                            <motion.div 
                              className="mt-4 md:mt-0"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.6 }}
                            >
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setIsWorkflowView(!isWorkflowView)}
                                className="transition-all duration-300 hover:scale-105 border-primary/30"
                              >
                                {isWorkflowView ? "Hide Workflow" : "Show Workflow"} 
                                <FaArrowRight className="ml-2 h-3 w-3" />
                              </Button>
                            </motion.div>
                          )}
                        </div>
                        
                        {/* Workflow Section */}
                        <AnimatePresence>
                          {(isWorkflowView || isExpanded) && (
                            <motion.div
                              className="w-full mt-4"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.5, type: "spring" }}
                            >
                              <div className="pt-6 border-t border-dashed border-primary/20">
                                <h4 className="text-lg font-medium mb-6 flex items-center text-primary">
                                  <FaProjectDiagram className="mr-2" />
                                  Development Workflow
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {item.workflow.map((step, stepIndex) => (
                                    <WorkflowStep
                                      key={step.title}
                                      step={step}
                                      stepIndex={stepIndex}
                                      totalSteps={item.workflow.length}
                                      isActive={isActive}
                                    />
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
        
        {/* Expertise Navigation - Only in carousel mode */}
        {!isExpanded && (
          <motion.div 
            className="flex justify-center mt-8 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {expertiseData.map((_, index) => (
              <button
                key={index}
                className="w-8 h-2 rounded-full transition-all duration-300"
                style={{ 
                  background: index === activeExpertise ? 'var(--primary)' : 'var(--border)',
                  transform: index === activeExpertise ? 'scale(1.2)' : 'scale(1)'
                }}
                onClick={() => setActiveExpertise(index)}
              />
            ))}
          </motion.div>
        )}
        
        {/* View Toggle Button */}
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="transition-all duration-300 hover:scale-105"
          >
            {isExpanded ? "Collapse View" : "Expand All Expertise"}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}