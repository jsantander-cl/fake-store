import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="text-xl font-black tracking-tight flex items-center gap-1"
          >
            🛍️ LUXE.
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-8xl font-black text-gray-900">404</p>
        <h1 className="text-xl font-bold text-gray-700">Page not found</h1>
        <p className="text-sm text-gray-400 text-center max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold uppercase tracking-wider transition-colors"
        >
          Back to Home
        </button>
      </div>

      <footer className="py-4 text-center text-xs text-gray-400">
        © 2024 Luxe Store. Powered by FakeStore API.
      </footer>
    </div>
  )
} 