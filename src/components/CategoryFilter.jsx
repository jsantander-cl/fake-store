import { useFetchCategories } from '../hooks/useFetchProducts'

const categoryLabels = {
  electronics: 'Electronics',
  jewelery: 'Jewelry',
  "men's clothing": "Men's",
  "women's clothing": "Women's",
}

export default function CategoryFilter({ activeCategory, onSelect }) {
  const { categories, loading } = useFetchCategories()

  if (loading) return null

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-1.5 text-sm font-medium border transition-colors ${
          activeCategory === null
            ? 'bg-gray-900 text-white border-gray-900'
            : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 text-sm font-medium border transition-colors ${
            activeCategory === cat
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
          }`}
        >
          {categoryLabels[cat] || cat}
        </button>
      ))}
    </div>
  )
}