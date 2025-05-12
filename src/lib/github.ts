import { Octokit } from "@octokit/rest";

export interface ContributionDay {
  contributionCount: number
  date: string
  color: string
}

export interface ContributionData {
  totalContributions: number
  weeks: {
    contributionDays: ContributionDay[]
  }[]
}

export interface Repository {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  language: string | null
  topics: string[]
  updated_at: string
}

interface GitHubGraphQLResponse {
  user: {
    contributionsCollection: {
      contributionCalendar: ContributionData
    }
  }
}

const getGitHubToken = () => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (!token) {
    throw new Error("GitHub token not found in environment variables");
  }
  return token;
};

export async function getGitHubContributions(username: string, year?: string) {
  const currentYear = new Date().getFullYear()
  const targetYear = year ? parseInt(year) : currentYear
  
  const query = `query {
    user(login: "${username}") {
      contributionsCollection(from: "${targetYear}-01-01T00:00:00Z", to: "${targetYear}-12-31T23:59:59Z") {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }`

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  const data = await response.json()
  return data.data.user.contributionsCollection.contributionCalendar
}

export const getGitHubRepositories = async (username: string): Promise<Repository[]> => {
  const octokit = new Octokit({
    auth: getGitHubToken(),
  });

  const { data } = await octokit.repos.listForUser({
    username,
    sort: "updated",
    direction: "desc",
    per_page: 6,
  });

  return data.map(repo => ({
    id: repo.id,
    name: repo.name,
    description: repo.description ?? null,
    stargazers_count: repo.stargazers_count ?? 0,
    forks_count: repo.forks_count ?? 0,
    html_url: repo.html_url,
    language: repo.language ?? null,
    topics: repo.topics ?? [],
    updated_at: repo.updated_at ?? new Date().toISOString(),
  }));
}; 