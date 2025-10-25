import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-red-500 py-3 sm:py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-xl sm:text-2xl font-bold hover:text-red-100 transition-colors">
            Zolig.mn
          </Link>
        </div>
      </div>
    </header>
  )
}
