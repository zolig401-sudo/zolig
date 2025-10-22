import Link from 'next/link'
import Image from 'next/image'
import type { Article, Media } from '@/payload-types'

interface ArticleCardProps {
  article: Article
  featuredImage?: Media
  variant?: 'default' | 'large' | 'small' | 'vertical'
}

export default function ArticleCard({ article, featuredImage, variant = 'default' }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year} оны ${month} сарын ${day}`
  }

  const getImageUrl = () => {
    // First try the featuredImage prop
    if (featuredImage?.url) return featuredImage.url
    
    // If no prop, try to get image from article.featuredImage directly
    if (article.featuredImage && typeof article.featuredImage === 'object' && article.featuredImage.url) {
      return article.featuredImage.url
    }
    
    return '/placeholder-news.svg'
  }

  const getCardClasses = () => {
    const baseClasses = "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    if (variant === 'large') return `${baseClasses} col-span-2`
    if (variant === 'small') return `${baseClasses} flex space-x-4 p-4`
    if (variant === 'vertical') return `${baseClasses} flex space-x-6 p-6`
    return baseClasses
  }

  return (
    <article className={getCardClasses()}>
      <Link href={`/article/${article.slug}`} className="block h-full">
        {variant === 'small' ? (
          <div className="flex space-x-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={getImageUrl()}
                alt={featuredImage?.alt || article.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">{article.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{article.previewText}</p>
              <time className="text-xs text-gray-500 mt-1 block">
                {formatDate(article.publishedAt || article.createdAt)}
              </time>
            </div>
          </div>
        ) : variant === 'vertical' ? (
          <div className="flex space-x-6">
            <div className="relative w-48 h-32 flex-shrink-0">
              <Image
                src={getImageUrl()}
                alt={featuredImage?.alt || article.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 mb-3 line-clamp-3">{article.previewText}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <time>{formatDate(article.publishedAt || article.createdAt)}</time>
                {article.tags && article.tags.length > 0 && (
                  <div className="flex space-x-1">
                    {article.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                        {tag.tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="relative h-48">
              <Image
                src={getImageUrl()}
                alt={featuredImage?.alt || article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{article.previewText}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <time>{formatDate(article.publishedAt || article.createdAt)}</time>
                {article.tags && article.tags.length > 0 && (
                  <div className="flex space-x-1">
                    {article.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                        {tag.tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </Link>
    </article>
  )
}
