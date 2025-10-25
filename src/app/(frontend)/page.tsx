import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { Metadata } from 'next'

import config from '@/payload.config'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import InfiniteScroll from './components/InfiniteScroll'
import ArticleCard from './components/ArticleCard'
import { getCategories, getLatestArticles, getFeaturedArticles } from './actions/articles'
import type { Article, Category, Media } from '@/payload-types'
import './styles.css'

export const metadata: Metadata = {
  title: 'Zolig.mn - Монголын шинэ мэдээ',
  description: 'Монголын хамгийн шинэ мэдээ, нийтлэл, мэдээлэл. Шинэ, санал болгох, эрэлттэй мэдээлэл.',
  openGraph: {
    title: 'Zolig.mn - Монголын шинэ мэдээ',
    description: 'Монголын хамгийн шинэ мэдээ, нийтлэл, мэдээлэл. Шинэ, санал болгох, эрэлттэй мэдээлэл.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Zolig.mn',
    locale: 'mn_MN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zolig.mn - Монголын шинэ мэдээ',
    description: 'Монголын хамгийн шинэ мэдээ, нийтлэл, мэдээлэл.',
    creator: '@zoligmn',
    site: '@zoligmn',
  },
}

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Fetch initial data
  const [categories, initialArticles, suggestedArticles, trendingArticles] = await Promise.all([
    getCategories(),
    getLatestArticles(1, 10),
    getFeaturedArticles('suggested', 5),
    getFeaturedArticles('trending', 5),
  ])

  // Create featured images map
  const featuredImages: Record<number, Media> = {}
  const allArticles = [...initialArticles.articles, ...suggestedArticles, ...trendingArticles]
  
  allArticles.forEach((article) => {
    if (article.featuredImage && typeof article.featuredImage === 'object') {
      featuredImages[article.featuredImage.id] = article.featuredImage
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryNav categories={categories} />
      
      <main className="py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Main content area */}
            <div className="lg:col-span-3 order-1">
              <section className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Шинэ</h2>
                <InfiniteScroll
                  initialArticles={initialArticles.articles}
                  featuredImages={featuredImages}
                />
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2 space-y-6 sm:space-y-8 order-2">
              {/* Suggested Articles */}
              <section className="">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Санал болгох</h3>
                <div className="space-y-3 sm:space-y-4">
                  {suggestedArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      featuredImage={featuredImages[article.featuredImage as number]}
                      variant="small"
                    />
                  ))}
                </div>
              </section>

              {/* Trending Articles */}
              <section className="">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Эрэлттэй</h3>
                <div className="space-y-3 sm:space-y-4">
                  {trendingArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      featuredImage={featuredImages[article.featuredImage as number]}
                      variant="small"
                    />
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
