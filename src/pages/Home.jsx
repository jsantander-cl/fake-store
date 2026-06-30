import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useFetchProducts } from '../hooks/useFetchProducts'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
// import CategoryFilter from '../components/CategoryFilter'
import Loading from '../components/Loading'
import Cart from '../components/Cart'

// ===== CATEGORÍAS =====
const categorias = ['electronics', 'jewelery', "men's clothing", "women's clothing"]

const categoriaLabels = {
  electronics: 'Electronics',
  jewelery: 'Jewelry',
  "men's clothing": "Men's",
  "women's clothing": "Women's",
}


const categoriaIconos = {
  "women's clothing": '/hanger-svgrepo-com.svg',
  "men's clothing": '/man-outline-svgrepo-com.svg',
  electronics: '/devices-electronics-svgrepo-com.svg',
  jewelery: '/ring-svgrepo-com.svg',
}


const categoriaNombreCorto = {
  "women's clothing": 'Women',
  "men's clothing": 'Men',
  electronics: 'Electronics',
  jewelery: 'Jewelry',
}

export default function Home() {
 
  const [busqueda, setBusqueda] = useState('')
  const [categoriaActiva, setCategoriaActiva] = useState(null)
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [busquedaAbierta, setBusquedaAbierta] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [cantidadVisible, setCantidadVisible] = useState(8)

  const { itemCount } = useCart()
  const { products, loading, error, retry } = useFetchProducts(categoriaActiva)

  
  const productosFiltrados = products.filter((p) =>
    p.title.toLowerCase().includes(busqueda.toLowerCase())
  )

  const productosVisibles = productosFiltrados.slice(0, cantidadVisible)
  const hayMasProductos = cantidadVisible < productosFiltrados.length

 
  const irAlInicio = () => {
    setCategoriaActiva(null)
    setBusqueda('')
  }

 
  const seleccionarCategoria = (cat) => {
    setCategoriaActiva(cat)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

     
      <header className="bg-white shadow-sm sticky top-0 z-40 hidden md:block">
        <div className="mx-auto px-6 py-4 flex items-center justify-between gap-6">

          <div className="flex items-center gap-8">
            <span
              className="text-xl font-black tracking-tight flex items-center gap-1 cursor-pointer"
              onClick={irAlInicio}
            >
              <img src="/buy-svgrepo-com.svg" alt="Logo" className="w-6 h-6 object-contain" />
              LUXE.
            </span>

            <nav className="flex gap-6">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaActiva(categoriaActiva === cat ? null : cat)}
                  className={`text-sm font-medium transition-colors ${
                    categoriaActiva === cat ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {categoriaLabels[cat]}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <SearchBar value={busqueda} onChange={setBusqueda} />

            <button className="text-gray-600 hover:text-gray-900">
              <img src="/heart-svgrepo-com.svg" alt="Favoritos" className="w-10 h-10" />
            </button>

            <button
              className="relative text-gray-800 hover:text-gray-900 flex items-center"
              onClick={() => setCarritoAbierto(true)}
            >
              <img src="/cart-large-svgrepo-com.svg" alt="Carrito" className="w-10 h-10" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>

            <button>
              <img src="/profile-circle-svgrepo-com.svg" alt="Perfil" className="w-11 h-11" />
            </button>
          </div>
        </div>
      </header>

      
      <header className="bg-white shadow-sm sticky py-3 top-0 z-40 md:hidden">
        <div className="px-4 py-3 flex items-center justify-between">

          <button onClick={() => setMenuAbierto(!menuAbierto)}>
            <img src="/menu-svgrepo-com.svg" alt="Menú" className="w-6 h-6" />
          </button>

          <span
            className="text-3xl font-black tracking-tight cursor-pointer text-blue-600"
            onClick={irAlInicio}
          >
            LUXE
          </span>

          <div className="flex items-center gap-4">
            <button onClick={() => setBusquedaAbierta(!busquedaAbierta)}>
              <img src="/search-svgrepo-com.svg" alt="Buscar" className="w-6 h-6" />
            </button>
            <button className="relative" onClick={() => setCarritoAbierto(true)}>
              <img src="/cart-large-svgrepo-com.svg" alt="Carrito" className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        
        {busquedaAbierta && (
          <div className="px-4 pb-3">
            <SearchBar value={busqueda} onChange={setBusqueda} />
          </div>
        )}

        
        {menuAbierto && (
          <nav className="px-4 pb-3 flex flex-col gap-2 border-t pt-3">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategoriaActiva(categoriaActiva === cat ? null : cat)
                  setMenuAbierto(false)
                }}
                className={`text-sm font-medium text-left py-1 ${
                  categoriaActiva === cat ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {categoriaLabels[cat]}
              </button>
            ))}
          </nav>
        )}
      </header>

      
      <section
        className="relative text-white container mx-auto my-10 bg-cover bg-center rounded-2xl overflow-hidden hidden md:block"
        style={{
          backgroundImage: `url(https://madisonavenuebid.org/wp-content/uploads/2023/09/Kiton220910_KTON_Store_0245-850x567.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" />
        <div className="relative mx-auto px-6 py-20 flex flex-col pl-20 gap-6">
          <p className="text-blue-600 w-fit text-2xl font-bold uppercase tracking-widest">
            New Collection 2024
          </p>
          <h1 className="text-4xl md:text-7xl font-black leading-tight">
            Redefine Your<br />
            <span className="text-blue-600">Everyday Style</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-2xl max-w-150">
            Explore our curated selection of premium electronics and high-fashion apparel tailored for the modern lifestyle.
          </p>
          <div className="flex gap-3 flex-wrap mt-2">
            <button
              onClick={irAlInicio}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition-colors"
            >
              Shop Collection
            </button>
            <button className="px-6 py-3 border border-white/40 hover:bg-white/10 text-white text-sm font-semibold rounded transition-colors">
              View Deals
            </button>
          </div>
        </div>
      </section>

     
      <section
        className="relative text-white max-w-full bg-cover bg-center p-10 md:hidden text-center"
        style={{
          backgroundImage: `url(https://img.magnific.com/fotos-premium/moda-criminal-hombre-bate-retro-vintage-gangster-victoriano-sobre-fondo-oscuro-violencia-estetica-criminal-modelo-masculino-arma-beisbol-actitud-amenazante-confianza_590464-145412.jpg?w=360)`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"/>
        <div className="relative px-6 py-16 flex flex-col gap-4">
          <p className="text-blue-500 text-xs font-bold uppercase tracking-widest">
            New Collection 2024
          </p>
          <h1 className="text-3xl font-black leading-tight">
            Redefine Your<br />
            <span className="text-blue-500">Everyday Style</span>
          </h1>
          <p className="text-gray-300 text-sm">
            Discover our curated collection of premium essentials designed for the modern lifestyle.
          </p>
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={irAlInicio}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition-colors"
            >
              Shop Collection
            </button>
            <button className="w-full py-3 border border-white/40 hover:bg-white/10 text-white text-sm font-semibold rounded transition-colors">
              View Lookbook
            </button>
          </div>
        </div>
      </section>

      
      <main className="mx-auto px-4 md:px-6 py-10 w-full flex-1">

       
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              <span className="md:hidden">New Arrivals</span>
              <span className="hidden md:inline">Trending Now</span>
            </h2>
            <p className="text-xs text-gray-400 hidden md:block">
              Our most popular items this week
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
            <span>⚙</span>
            <span>Sort by: Newest ▾</span>
          </div>
        </div>

        {loading && <Loading />}

        {error && (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={retry}
              className="px-6 py-2 bg-gray-900 text-white text-sm hover:bg-gray-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && productosFiltrados.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-3 text-gray-400">
            <span className="text-5xl">😕</span>
            <p className="text-sm">No se encontraron productos.</p>
          </div>
        )}

        {!loading && !error && productosVisibles.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {productosVisibles.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

        
            <div className="mt-12 flex flex-col items-center gap-3">
              {hayMasProductos && (
                <button
                  onClick={() => setCantidadVisible((c) => c + 8)}
                  className="px-10 py-2.5 border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 transition-colors"
                >
                  Load More Products
                </button>
              )}
              <p className="text-xs text-gray-400">
                Showing {productosVisibles.length} of {productosFiltrados.length} products
              </p>
            </div>
          </>
        )}

        
        <div className=" md:hidden mt-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Shop by Category</h2>
          <div className="justify-center flex gap-10 pb-2 scrollbar-hide">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => seleccionarCategoria(cat)}
                className="flex flex-col items-center gap-2 shrink-0"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow flex items-center justify-center">
                  <img
                    src={categoriaIconos[cat]}
                    alt={categoriaNombreCorto[cat]}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <span className="text-xs text-gray-700 font-medium">
                  {categoriaNombreCorto[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      
      <footer className="bg-white text-gray-400 mt-16 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 font-medium">
          <div>
            <span className="text-black font-black text-lg flex items-center gap-1 mb-3">
              <img src="/buy-svgrepo-com.svg" alt="Logo" className="w-5 h-5" />
              LUXE.
            </span>
            <p className="text-sm leading-relaxed mb-4">
              Your one-stop destination for premium lifestyle products, from jewelry to electronics. Quality guaranteed.
            </p>
            <div className="flex gap-3 text-lg">
              <span className="cursor-pointer hover:text-black transition-colors"><img src="/share-svgrepo-com.svg" alt="Share" className="w-7 h-7" /></span>
              <span className="cursor-pointer hover:text-black transition-colors"><img src="/arroba-sign-svgrepo-com.svg" alt="Arroba" className="w-7 h-7" /></span>
            </div>
          </div>

          <div>
            <h4 className="text-black font-semibold text-xs uppercase tracking-widest mb-5">Categories</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { label: 'Electronics', cat: 'electronics' },
                { label: 'Jewelry', cat: 'jewelery' },
                { label: "Men's Fashion", cat: "men's clothing" },
                { label: "Women's Fashion", cat: "women's clothing" },
              ].map(({ label, cat }) => (
                <li key={cat}>
                  <button onClick={() => seleccionarCategoria(cat)} className="hover:text-black transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-black font-semibold text-xs uppercase tracking-widest mb-5">Support</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {['Help Center', 'Shipping Policy', 'Returns & Refunds', 'Order Tracking'].map((item) => (
                <li key={item}>
                  <span className="hover:text-black cursor-pointer transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-black font-semibold text-xs uppercase tracking-widest mb-5">Newsletter</h4>
            <p className="text-sm mb-4">Get the latest updates on new arrivals and sales.</p>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-3 py-2.5 rounded bg-gray-200 text-sm text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:border-blue-500 mb-3"
            />
            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        <div className="border-t border-gray-300 px-10 py-8 flex flex-col md:flex-row items-center justify-between text-sm gap-2">
          <span>© 2024 Luxe Store. Powered by FakeStore API.</span>
          <div className="flex gap-5">
            {['Terms of Service', 'Privacy Policy', 'Cookies'].map((t) => (
              <span key={t} className="hover:text-black cursor-pointer transition-colors">{t}</span>
            ))}
          </div>
        </div>
      </footer>

     
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-t-gray-200 z-40 flex">
        {[
          { icono: '/home-svgrepo-com.svg', label: 'HOME', accion: irAlInicio },
          { icono: '/explore-solid-svgrepo-com.svg', label: 'EXPLORE', accion: () => setBusquedaAbierta(true) },
          { icono: '/heart-svgrepo-com.svg', label: 'WISHLIST', accion: () => {} },
          { icono: '/profile-circle-svgrepo-com.svg', label: 'PROFILE', accion: () => {} },
        ].map(({ icono, label, accion }, index) => {
          const activo = index === 0 && !categoriaActiva && !busqueda
          return (
            <button
              key={label}
              onClick={accion}
              className="flex-1 flex flex-col items-center py-2 gap-1"
            >
              <img
                src={icono}
                alt={label}
                className={`w-6 h-6 transition-all ${activo ? 'opacity-100' : 'opacity-50'}`}
                style={{
                  filter: activo
                    ? 'invert(35%) sepia(95%) saturate(1800%) hue-rotate(210deg) brightness(95%)'
                    : 'grayscale(100%)',
                }}
              />
              <span className={`text-[10px] font-semibold tracking-wider ${activo ? 'text-blue-600' : 'text-gray-500'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </nav>

      <div className="md:hidden h-16" />

      {carritoAbierto && <Cart onClose={() => setCarritoAbierto(false)} />}
    </div>
  )
}