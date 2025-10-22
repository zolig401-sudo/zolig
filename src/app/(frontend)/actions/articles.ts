'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getLatestArticles(page = 1, limit = 10) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const result = await payload.find({
    collection: 'articles',
    where: {
      isPublished: {
        equals: true,
      },
    },
    sort: '-publishedAt',
    page,
    limit,
    depth: 2,
  })
  
  return {
    articles: result.docs,
    hasMore: result.hasNextPage,
  }
}

export async function getFeaturedArticles(featureType: 'suggested' | 'trending', limit = 5) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const result = await payload.find({
    collection: 'articles',
    where: {
      and: [
        {
          isPublished: {
            equals: true,
          },
        },
        {
          featureType: {
            equals: featureType,
          },
        },
      ],
    },
    sort: '-publishedAt',
    limit,
    depth: 2,
  })
  
  return result.docs
}

export async function getCategories() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const result = await payload.find({
    collection: 'categories',
    sort: 'order',
  })
  
  return result.docs
}
