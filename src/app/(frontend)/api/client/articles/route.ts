import { NextRequest, NextResponse } from 'next/server'
import { getLatestArticles } from '../../../actions/articles'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    const result = await getLatestArticles(page, limit)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}
