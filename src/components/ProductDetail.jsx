import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Loading from './Loading'

export default function ProductDetail({ product, loading, error, retry }) {
  const navigate = useNavigate()
  const { addItem } = useCart()

  if (loading) return <Loading />

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <p className="text-red-400 text-sm">{error}</p>
      <button
        onClick={retry}
        className="px-6 py-2 bg-gray-900 text-white text-sm hover:bg-gray-700 transition-colors"
      >
        Retry
      </button>
    </div>
  )

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-3xl font-black tracking-tight flex items-center gap-1"
          >
            <img src="/buy-svgrepo-com.svg" alt="Logo" className="w-8 h-8" /> LUXE.
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            ← Back
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="bg-white flex flex-col md:flex-row gap-10 md:gap-16 p-6 md:p-10">

          {/* IMAGE */}
          <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-8 min-h-64">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 max-w-full object-contain"
            />
          </div>

          {/* INFO */}
          <div className="md:w-1/2 flex flex-col justify-center gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              {product.category}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              {product.title}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400 text-sm">
                  {'★'.repeat(Math.round(product.rating.rate))}
                  {'☆'.repeat(5 - Math.round(product.rating.rate))}
                </div>
                <span className="text-xs text-gray-400">
                  {product.rating.rate} — {product.rating.count} reviews
                </span>
              </div>
            )}

            <p className="text-3xl font-black text-gray-900">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-sm text-gray-500 leading-relaxed border-t pt-4">
              {product.description}
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => addItem(product)}
                className="w-full py-3 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => navigate(-1)}
                className="w-full py-3 border border-gray-300 hover:border-gray-900 text-gray-700 text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}