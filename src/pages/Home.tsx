import { Hero } from '../components/Hero'

export function Home() {
  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Home
          </h1>
        </div>
      </header>
      <main className="h-[calc(100vh-149px)]">
        <Hero />
      </main>
    </div>
  )
}
