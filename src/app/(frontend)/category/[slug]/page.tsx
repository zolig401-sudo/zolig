import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import config from '@/payload.config'
import Header from '../../components/Header'
import CategoryNav from '../../components/CategoryNav'
import ArticleCard from '../../components/ArticleCard'
import { getCategories, getLatestArticles } from '../../actions/articles'
import type { Article, Category, Media } from '@/payload-types'
import Link from 'next/link'

async function getCategory(slug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const result = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  
  return result.docs[0] || null
}

async function getCategoryArticles(categoryId: number, page = 1, limit = 12) {
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
          category: {
            equals: categoryId,
          },
        },
      ],
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const category = await getCategory(resolvedParams.slug)
  
  if (!category) {
    return {
      title: 'Ангилал олдсонгүй',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const categoryUrl = `${siteUrl}/category/${category.slug}`

  return {
    title: `${category.label} | Zolig.mn`,
    description: category.description || `${category.label} ангиллын мэдээлэл`,
    openGraph: {
      title: category.label,
      description: category.description || `${category.label} ангиллын мэдээлэл`,
      url: categoryUrl,
      siteName: 'Zolig.mn',
      locale: 'mn_MN',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: category.label,
      description: category.description || `${category.label} ангиллын мэдээлэл`,
      creator: '@zoligmn',
      site: '@zoligmn',
    },
    alternates: {
      canonical: categoryUrl,
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const resolvedParams = await params
  
  const [category, categories, categoryArticles] = await Promise.all([
    getCategory(resolvedParams.slug),
    getCategories(),
    getCategory(resolvedParams.slug).then(async (cat) => {
      if (!cat) return { articles: [], hasMore: false }
      return getCategoryArticles(cat.id)
    }),
  ])

  if (!category) {
    notFound()
  }

  // Create featured images map
  const featuredImages: Record<number, Media> = {}
  categoryArticles.articles.forEach((article) => {
    if (article.featuredImage && typeof article.featuredImage === 'object') {
      featuredImages[article.featuredImage.id] = article.featuredImage
    }
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year} оны ${month} сарын ${day}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryNav categories={categories} />
      
      {/* Category Header */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{category.label}</h1>
            {category.description && (
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                {category.description}
              </p>
            )}
            <div className="mt-6 text-lg">
              {categoryArticles.articles.length} мэдээлэл олдлоо
            </div>
          </div>
        </div>
      </section>
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categoryArticles.articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArticles.articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  featuredImage={featuredImages[article.featuredImage as number]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Мэдээлэл олдсонгүй</h3>
                <p className="text-gray-600 mb-4">
                  {category.label} категори дээрх мэдээлэл олдсонгүй.
                </p>
                <Link href="/" className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Нүүр хуудас руу буцах
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
