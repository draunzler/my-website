"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"

interface TimelineItem {
  year: string
  title: string
  organization: string
  description: string
  type: 'education' | 'work' | 'startup'
}

const timelineData: TimelineItem[] = [
  {
    year: "2005-2017",
    title: "Primary & Secondary Education",
    organization: "Abbot Shishu Hall",
    description: "Completed primary and secondary education with strong academic foundation",
    type: "education"
  },
  {
    year: "2017-2019",
    title: "High School",
    organization: "TIGPS",
    description: "Completed high school education with focus on science and mathematics",
    type: "education"
  },
  {
    year: "2019-2023",
    title: "Bachelor's Degree",
    organization: "Chandigarh University",
    description: "Pursued higher education in technology and computer science",
    type: "education"
  },
  {
    year: "2023-present",
    title: "SDE-1",
    organization: "Finarb Analytics Consultancy",
    description: "Working as a Software Development Engineer, focusing on building scalable solutions",
    type: "work"
  },
  {
    year: "2025-present",
    title: "Co-founder",
    organization: "QuantimedX LLC",
    description: "Co-founded a healthcare technology company focused on innovative solutions",
    type: "startup"
  }
]

const getBadgeVariant = (type: TimelineItem['type']) => {
  switch (type) {
    case 'education':
      return 'secondary'
    case 'work':
      return 'default'
    case 'startup':
      return 'destructive'
    default:
      return 'default'
  }
}

export function Timeline() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
      controls.start("draw")
    }
  }, [controls, inView])

  return (
    <div ref={ref} className="relative w-full py-8">
      {/* Animated center line */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { pathLength: 0 },
          draw: { 
            pathLength: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
          }
        }}
        className="absolute left-[20px] md:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50 md:-translate-x-1/2"
        style={{
          transformOrigin: "top",
          background: "linear-gradient(to bottom, transparent, var(--primary) 50%, transparent)"
        }}
      />

      <div className="space-y-6 md:space-y-12">
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={index}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: {
                  opacity: 0,
                  x: isEven ? -50 : 50
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.2
                  }
                }
              }}
              className="relative"
            >
              {/* Mobile layout - always on the right side of the timeline */}
              <div className="flex md:hidden">
                <motion.div 
                  className="w-full pl-12"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="relative hover:shadow-lg transition-shadow duration-300">
                    {/* Animated dot on the timeline - mobile */}
                    <motion.div 
                      className="absolute top-1/2 left-[-24px] w-4 h-4 rounded-full bg-primary -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={controls}
                      variants={{
                        hidden: { scale: 0 },
                        visible: {
                          scale: 1,
                          transition: {
                            delay: index * 0.2 + 0.3,
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                          }
                        }
                      }}
                      whileHover={{ scale: 1.2 }}
                    />
                    {/* Animated connecting line - mobile */}
                    <motion.div 
                      className="absolute top-1/2 left-[-12px] w-4 h-0.5 bg-primary -translate-y-1/2"
                      initial={{ scaleX: 0 }}
                      animate={controls}
                      variants={{
                        hidden: { scaleX: 0 },
                        visible: {
                          scaleX: 1,
                          transition: {
                            delay: index * 0.2 + 0.2,
                            duration: 0.3
                          }
                        }
                      }}
                    />
                    
                    <CardContent className="p-4 relative overflow-hidden">
                      <TimelineCardContent item={item} index={index} controls={controls} />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              
              {/* Desktop layout - alternating left and right */}
              <div className={`hidden md:flex ${isEven ? 'md:justify-end' : ''}`}>
                <motion.div 
                  className={`md:w-1/2 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="relative hover:shadow-lg transition-shadow duration-300">
                    {/* Animated dot on the timeline - desktop */}
                    <motion.div 
                      className={`absolute top-1/2 ${isEven ? 'right-[-29px]' : 'left-[-29px]'} w-4 h-4 rounded-full bg-primary -translate-y-1/2`}
                      initial={{ scale: 0 }}
                      animate={controls}
                      variants={{
                        hidden: { scale: 0 },
                        visible: {
                          scale: 1,
                          transition: {
                            delay: index * 0.2 + 0.3,
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                          }
                        }
                      }}
                      whileHover={{ scale: 1.2 }}
                    />
                    {/* Animated connecting line - desktop */}
                    <motion.div 
                      className={`absolute top-1/2 ${isEven ? 'right-[-16px]' : 'left-[-16px]'} w-4 h-0.5 bg-primary -translate-y-1/2`}
                      initial={{ scaleX: 0 }}
                      animate={controls}
                      variants={{
                        hidden: { scaleX: 0 },
                        visible: {
                          scaleX: 1,
                          transition: {
                            delay: index * 0.2 + 0.2,
                            duration: 0.3
                          }
                        }
                      }}
                    />
                    
                    <CardContent className="p-4 relative overflow-hidden">
                      <TimelineCardContent item={item} index={index} controls={controls} />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  )
}

interface TimelineCardContentProps {
  item: TimelineItem
  index: number
  controls: ReturnType<typeof useAnimation>
}

// Extracted card content component to avoid repetition
function TimelineCardContent({ item, index, controls }: TimelineCardContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.2 + 0.4,
            duration: 0.5
          }
        }
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
        <div>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.organization}</p>
        </div>
        <Badge 
          variant={getBadgeVariant(item.type)}
          className="transition-all duration-300 hover:scale-105 self-start"
        >
          {item.year}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{item.description}</p>
    </motion.div>
  );
}