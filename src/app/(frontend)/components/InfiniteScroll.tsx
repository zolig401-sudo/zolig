'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import ArticleCard from './ArticleCard'
import type { Article, Media } from '@/payload-types'

interface InfiniteScrollProps {
  initialArticles: Article[]
  featuredImages: Record<number, Media>
}

export default function InfiniteScroll({ 
  initialArticles, 
  featuredImages: initialFeaturedImages
}: InfiniteScrollProps) {
  const [articles, setArticles] = useState(initialArticles)
  const [featuredImages, setFeaturedImages] = useState(initialFeaturedImages)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)

  // Update featured images when initial images change
  useEffect(() => {
    setFeaturedImages(initialFeaturedImages)
  }, [initialFeaturedImages])

  const loadMore = useCallback(async () => {
    if (loading) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/client/articles?page=${page + 1}&limit=10`)
      const { articles: newArticles, hasMore: moreAvailable } = await response.json()
      
      // Add featured images for new articles to the map
      const newFeaturedImages = { ...featuredImages }
      newArticles.forEach((article: Article) => {
        if (article.featuredImage && typeof article.featuredImage === 'object') {
          newFeaturedImages[article.featuredImage.id] = article.featuredImage
        }
      })
      setFeaturedImages(newFeaturedImages)
      
      setArticles(prev => [...prev, ...newArticles])
      setPage(prev => prev + 1)
      setHasMore(moreAvailable)
    } catch (error) {
      console.error('Error loading more articles:', error)
    } finally {
      setLoading(false)
    }
  }, [loading, page, featuredImages])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading, loadMore])

  return (
    <div>
      <div className="space-y-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            featuredImage={featuredImages[article.featuredImage as number]}
            variant="vertical"
          />
        ))}
      </div>
      {hasMore && (
        <div ref={observerRef} className="mt-8 text-center">
          {loading && (
            <div className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Уншиж байна...
            </div>
          )}
        </div>
      )}
    </div>
  )
}
