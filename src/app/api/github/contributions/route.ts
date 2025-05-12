import { NextResponse } from 'next/server'
import { getGitHubContributions } from '@/lib/github'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    const data = await getGitHubContributions(username)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub contributions' },
      { status: 500 }
    )
  }
} 