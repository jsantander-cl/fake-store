import { useParams } from 'react-router-dom'
import { useFetchProduct } from '../hooks/useFetchProducts'
import ProductDetail from '../components/ProductDetail'

export default function ProductPage() {
  const { id } = useParams()
  const { product, loading, error, retry } = useFetchProduct(id)

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetail product={product} loading={loading} error={error} retry={retry} />
    </div>
  )
}