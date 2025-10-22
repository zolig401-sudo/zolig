import Link from 'next/link'
import type { Category } from '@/payload-types'

interface CategoryNavProps {
  categories: Category[]
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 py-4 overflow-x-auto">
          {categories
            .sort((a, b) => a.order - b.order)
            .map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="text-gray-600 hover:text-red-500 whitespace-nowrap py-2 px-3 rounded-md hover:bg-red-50 transition-colors font-medium"
              >
                {category.label}
              </Link>
            ))}
        </div>
      </div>
    </nav>
  )
}
