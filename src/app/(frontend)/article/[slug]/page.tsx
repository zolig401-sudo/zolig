import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'

import config from '@/payload.config'
import Header from '../../components/Header'
import CategoryNav from '../../components/CategoryNav'
import ArticleSidebar from '../../components/ArticleSidebar'
import SocialShare from '../../components/SocialShare'
import { getCategories, getLatestArticles } from '../../actions/articles'
import type { Article, Category, Media } from '@/payload-types'

async function getArticle(slug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const result = await payload.find({
    collection: 'articles',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          isPublished: {
            equals: true,
          },
        },
      ],
    },
    limit: 1,
    depth: 2,
  })
  
  return result.docs[0] || null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const article = await getArticle(resolvedParams.slug)
  
  if (!article) {
    return {
      title: 'Мэдээлэл олдсонгүй',
    }
  }

  const getImageUrl = () => {
    if (article.featuredImage && typeof article.featuredImage === 'object') {
      return article.featuredImage.url || '/placeholder-news.svg'
    }
    return '/placeholder-news.svg'
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const articleUrl = `${siteUrl}/article/${article.slug}`
  const imageUrl = article.featuredImage && typeof article.featuredImage === 'object' 
    ? article.featuredImage.url 
    : `${siteUrl}/placeholder-news.svg`

  return {
    title: `${article.title} | Zolig.mn`,
    description: article.previewText || article.title,
    openGraph: {
      title: article.title,
      description: article.previewText || article.title,
      url: articleUrl,
      siteName: 'Zolig.mn',
      images: [
        {
          url: imageUrl ? imageUrl : '/placeholder-news.svg',
          width: 800,
          height: 400,
          alt: article.title,
        },
      ],
      locale: 'mn_MN',
      type: 'article',
      publishedTime: article.publishedAt || article.createdAt,
      authors: ['Zolig.mn'],
      section: typeof article.category === 'object' ? article.category.label : 'Мэдээлэл',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.previewText || article.title,
      images: [imageUrl ? imageUrl : '/placeholder-news.svg'],
      creator: '@zoligmn',
      site: '@zoligmn',
    },
    alternates: {
      canonical: articleUrl,
    },
  }
}

function renderRichText(content: any) {
  if (!content?.root?.children) return null

  return content.root.children.map((node: any, index: number) => {
    if (node.type === 'paragraph') {
      return (
        <p key={index} className="mb-6 text-lg text-gray-700 leading-relaxed">
          {node.children?.map((child: any, childIndex: number) => {
            if (child.type === 'text') {
              return (
                <span
                  key={childIndex}
                  className={`${
                    child.format?.bold ? 'font-bold' : ''
                  } ${
                    child.format?.italic ? 'italic' : ''
                  } ${
                    child.format?.underline ? 'underline' : ''
                  }`}
                >
                  {child.text}
                </span>
              )
            }
            return null
          })}
        </p>
      )
    }
    
    if (node.type === 'heading' && node.tag === 'h2') {
      return (
        <h2 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4 leading-tight">
          {node.children?.map((child: any, childIndex: number) => (
            <span key={childIndex}>{child.text}</span>
          ))}
        </h2>
      )
    }
    
    if (node.type === 'heading' && node.tag === 'h3') {
      return (
        <h3 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3 leading-tight">
          {node.children?.map((child: any, childIndex: number) => (
            <span key={childIndex}>{child.text}</span>
          ))}
        </h3>
      )
    }

    return null
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const resolvedParams = await params
  
  const [article, categories, latestArticlesResult] = await Promise.all([
    getArticle(resolvedParams.slug),
    getCategories(),
    getLatestArticles(1, 5),
  ])

  if (!article) {
    notFound()
  }

  const latestArticles = latestArticlesResult.articles

  // Create featured images map
  const featuredImages: Record<number, Media> = {}
  latestArticles.forEach((art) => {
    if (art.featuredImage && typeof art.featuredImage === 'object') {
      featuredImages[art.featuredImage.id] = art.featuredImage
    }
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year} оны ${month} сарын ${day}`
  }

  const getImageUrl = () => {
    if (article.featuredImage && typeof article.featuredImage === 'object') {
      return article.featuredImage.url || '/placeholder-news.svg'
    }
    return '/placeholder-news.svg'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryNav categories={categories} />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main article content */}
            <article className="lg:col-span-3 bg-white rounded-lg shadow-md p-8">
              <header className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full font-medium">
                    {typeof article.category === 'object' ? article.category.label : 'Ангилалгүй'}
                  </span>
                  <time className="font-medium">
                    {formatDate(article.publishedAt || article.createdAt)}
                  </time>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{article.title}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{article.previewText}</p>
              </header>

              {article.featuredImage && (
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={getImageUrl()}
                    alt={typeof article.featuredImage === 'object' ? article.featuredImage.alt || article.title : article.title}
                    width={800}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                {renderRichText(article.content)}
              </div>

              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Шошго:</h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        {tag.tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Sharing */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <SocialShare
                  title={article.title}
                  url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/article/${article.slug}`}
                  description={article.previewText}
                />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <ArticleSidebar
                articles={latestArticles}
                featuredImages={featuredImages}
                title="Шинэ"
              />
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
