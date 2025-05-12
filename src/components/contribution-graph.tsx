"use client"

import { useEffect, useState } from "react"
import { Card } from "./ui/card"
import { ContributionDay, getGitHubContributions } from "@/lib/github"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface ContributionGraphProps {
  username: string
}

function getContributionColor(contributionCount: number, isDarkMode = false) {
  // Define color levels with proper index signature
  type ColorPalette = {
    [key: number]: string;
  };
  
  // Light theme colors with custom color for low contributions
  const colors: ColorPalette = {
    0: isDarkMode ? '#1D293D' : '#ebedf0', // Empty cells - dark blue in dark mode, light gray in light mode
    1: '#9be9a8', // level 1
    2: '#40c463', // level 2
    3: '#30a14e', // level 3
    4: '#216e39'  // level 4
  };
  
  // Dark theme colors
  const darkColors: ColorPalette = {
    0: '#1D293D', // empty/low - dark blue in dark mode
    1: '#0e4429', // level 1
    2: '#006d32', // level 2
    3: '#26a641', // level 3
    4: '#39d353'  // level 4
  };
  
  // Choose color palette based on theme
  const palette = isDarkMode ? darkColors : colors;
  
  // Determine level based on contribution count
  let level = 0;
  if (contributionCount === 0) level = 0;
  else if (contributionCount <= 3) level = 1;
  else if (contributionCount <= 9) level = 2;
  else if (contributionCount <= 15) level = 3;
  else level = 4;
  
  return {
    backgroundColor: palette[level],
    border: 'none'
  };
}

export function ContributionGraph({ username }: ContributionGraphProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
  const [data, setData] = useState<{
    totalContributions: number
    weeks: {
      contributionDays: ContributionDay[]
    }[]
  } | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Function to check if dark mode is active
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)
    }
    
    // Initial check
    checkDarkMode()
    
    // Observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkDarkMode()
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contributionData = await getGitHubContributions(username, selectedYear)
        setData(contributionData)
      } catch (error) {
        console.error('Error fetching GitHub contributions:', error)
      }
    }
    fetchData()
  }, [username, selectedYear])

  if (!mounted || !data) return (
    <div className="w-full h-[200px] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center space-y-4">
        <div className="h-4 bg-muted rounded w-48"></div>
        <div className="space-y-2">
          <div className="h-2 bg-muted rounded w-32"></div>
          <div className="h-2 bg-muted rounded w-40"></div>
        </div>
      </div>
    </div>
  )

  const allDays = data.weeks.flatMap(week => week.contributionDays)
  
  // Group days by month
  const monthGroups = allDays.reduce((acc, day) => {
    const date = new Date(day.date)
    const month = date.toLocaleString('default', { month: 'short' })
    if (!acc[month]) {
      acc[month] = []
    }
    acc[month].push(day)
    return acc
  }, {} as Record<string, ContributionDay[]>)

  // Get unique months in order
  const months = Object.keys(monthGroups)

  const maxContributions = Math.max(...allDays.map(day => day.contributionCount))
  const totalDaysWithContributions = allDays.filter(day => day.contributionCount > 0).length
  const averageContributions = totalDaysWithContributions === 0 ? 0 : 
    Math.round(data.totalContributions / totalDaysWithContributions)

  // Using larger cells to utilize full width
  const CELL_SIZE = 14 // Larger cells than GitHub's standard
  const CELL_GAP = 3 // Slightly larger gap
  const WEEK_WIDTH = CELL_SIZE + CELL_GAP

  // Generate available years (from 2008 - GitHub's founding - to current year)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2018 }, (_, i) => (currentYear - i).toString())

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium"></h3>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[100px] h-8 text-xs">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year} className="text-xs">
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats summary - similar to GitHub's contribution summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{data.totalContributions.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Contributions</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{maxContributions.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Most in One Day</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{averageContributions.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Average Per Active Day</div>
          </div>
        </Card>
      </div>

      {/* Center-aligned graph container */}
      <div className="w-full bg-card rounded-lg p-4 border border-border flex justify-center">
        <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
          <div className="min-w-max">
            {/* Months layout */}
            <div className="flex mb-2 pl-10">
              {months.map((month, i) => {
                const weeksInMonth = Math.ceil(monthGroups[month].length / 7)
                return (
                  <div
                    key={month}
                    className="text-xs text-muted-foreground"
                    style={{
                      width: `${weeksInMonth * WEEK_WIDTH}px`,
                      marginLeft: i === 0 ? '0' : '-4px', // Adjusted for larger cells
                      textAlign: 'start'
                    }}
                  >
                    {month}
                  </div>
                )
              })}
            </div>

            {/* Days and contribution cells */}
            <div className="flex">
              {/* Day labels - GitHub style displays only Mon, Wed, Fri */}
              <div className="flex flex-col gap-[3px] mr-2 text-xs text-muted-foreground" style={{ width: '20px' }}>
                <div style={{ height: CELL_SIZE }} />
                <div style={{ height: CELL_SIZE*2 + CELL_GAP, lineHeight: `${CELL_SIZE*2 + CELL_GAP}px` }}>Mon</div>
                <div style={{ height: CELL_SIZE*2 + CELL_GAP, lineHeight: `${CELL_SIZE*2 + CELL_GAP}px` }}>Wed</div>
                <div style={{ height: CELL_SIZE*2 + CELL_GAP, lineHeight: `${CELL_SIZE*2 + CELL_GAP}px` }}>Fri</div>
              </div>

              {/* Contribution grid */}
              <div className="flex gap-[3px]">
                {data.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.contributionDays.map((day, dayIndex) => {
                      const date = new Date(day.date)
                      const formattedDate = date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                      const cellStyle = getContributionColor(day.contributionCount, isDarkMode)
                      const tooltipText = day.contributionCount === 0 ? 
                        `No contributions on ${formattedDate}` : 
                        `${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'} on ${formattedDate}`
                      
                      return (
                        <div
                          key={dayIndex}
                          style={{
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            ...cellStyle,
                            borderRadius: '3px', // Slightly more rounded for larger cells
                          }}
                          className="hover:opacity-80 transition-opacity"
                          title={tooltipText} // GitHub-style tooltip
                          data-date={day.date}
                          data-count={day.contributionCount}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend - Updated style */}
            <div className="flex items-center justify-end mt-4 gap-1 text-xs text-muted-foreground">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: isDarkMode ? 
                      ['#1D293D', '#0e4429', '#006d32', '#26a641', '#39d353'][level] : 
                      [isDarkMode ? '#1D293D' : '#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'][level],
                    borderRadius: '2px'
                  }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}