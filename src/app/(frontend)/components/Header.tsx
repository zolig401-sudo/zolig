import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-red-500 py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold hover:text-red-100 transition-colors">
            Zolig.mn
          </Link>
        </div>
      </div>
    </header>
  )
}
