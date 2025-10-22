import ArticleCard from './ArticleCard'
import type { Article, Media } from '@/payload-types'

interface ArticleSidebarProps {
  articles: Article[]
  featuredImages: Record<number, Media>
  title: string
}

export default function ArticleSidebar({ articles, featuredImages, title }: ArticleSidebarProps) {
  return (
    <aside className="">
      <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">{title}</h3>
      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            featuredImage={featuredImages[article.featuredImage as number]}
            // variant="small"
          />
        ))}
      </div>
    </aside>
  )
}
