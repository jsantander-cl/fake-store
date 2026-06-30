import { useCart } from '../context/CartContext'

export default function Cart({ onClose }) {
  const { cart, removeItem, updateQuantity, total, clearCart } = useCart()

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 bg-white w-full max-w-md h-full flex flex-col shadow-2xl">

        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-base font-bold uppercase tracking-widest text-gray-900">Your Cart</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl transition-colors">✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
            <span className="text-5xl">🛒</span>
            <p className="text-sm">Your cart is empty</p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-gray-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-start border-b pb-5">
                  <div className="bg-gray-50 p-2 shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{item.title}</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                        className="w-7 h-7 border border-gray-300 text-gray-600 hover:bg-gray-100 flex items-center justify-center text-sm transition-colors"
                      >−</button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 border border-gray-300 text-gray-600 hover:bg-gray-100 flex items-center justify-center text-sm transition-colors"
                      >+</button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors text-lg shrink-0"
                  >✕</button>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t flex flex-col gap-3 bg-white">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 uppercase tracking-wider">Total</span>
                <span className="text-2xl font-black text-gray-900">${total.toFixed(2)}</span>
              </div>
              <button
                className="w-full py-3 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full py-2 border border-gray-200 text-gray-400 text-xs hover:border-red-300 hover:text-red-400 transition-colors uppercase tracking-wider"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}