"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Repository, getGitHubRepositories } from "@/lib/github"
import { motion } from "framer-motion"
import { Star, GitFork, ExternalLink } from "lucide-react"
import { Badge } from "./ui/badge"

// GitHub language colors mapping
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Ruby: "#701516",
  PHP: "#4F5D95",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Rust: "#dea584",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Lua: "#000080",
  Clojure: "#db5855",
  Vue: "#41b883",
  R: "#198CE7",
  Perl: "#0298c3",
  MATLAB: "#e16737",
  // Add more languages as needed
}

// Function to get language color or return a default color
const getLanguageColor = (language: string | null): string => {
  if (!language) return "#858585" // Default gray for no language
  return languageColors[language] || "#858585" // Return mapped color or default
}

interface RepositoryGridProps {
  username: string
}

export function RepositoryGrid({ username }: RepositoryGridProps) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const repos = await getGitHubRepositories(username)
        setRepositories(repos)
      } catch (error) {
        console.error('Error fetching repositories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRepositories()
  }, [username])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded w-full mb-2"></div>
              <div className="h-3 bg-muted rounded w-4/5"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repositories.map((repo, index) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{repo.name}</span>
                <a 
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardTitle>
              <CardDescription className="flex items-center space-x-4">
                {repo.language && (
                  <span className="flex items-center">
                    <span 
                      className="w-2 h-2 rounded-full mr-1"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    ></span>
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center">
                  <GitFork className="h-4 w-4 mr-1" />
                  {repo.forks_count}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {repo.description || "No description provided"}
              </p>
              <div className="flex flex-wrap gap-2">
                {repo.topics.slice(0, 3).map(topic => (
                  <Badge key={topic} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}