import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addItem } = useCart()

  return (
    
    <div className="group bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col p-4 max-w-sm">
      
      <div
        className="cursor-pointer overflow-hidden bg-[#f8f9fa] rounded-xl flex items-center justify-center h-64 w-full"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.title}
       
          className="h-full w-full object-contain p-6 group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      
      <div className="pt-4 flex flex-col flex-1">
        
        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">
          {product.category}
        </p>
        
        <h2
          className="text-sm font-semibold text-gray-800 line-clamp-1 cursor-pointer mb-3"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.title}
        </h2>
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
          {product.rating && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span className="text-yellow-400">★</span> {product.rating.rate}
            </div>
          )}
        </div>
        
        <button
          onClick={() => addItem(product)}
          className="w-full py-3 bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold rounded-xl uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  )
}
