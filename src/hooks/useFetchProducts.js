import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

export function useFetchProducts(category = null) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = category
        ? `${BASE_URL}/products/category/${category}`
        : `${BASE_URL}/products`
      const { data } = await axios.get(url)
      setProducts(data)
    } catch (err) {
      setError('Error al cargar los productos. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [category])

  return { products, loading, error, retry: fetchProducts }
}

export function useFetchProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProduct = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.get(`${BASE_URL}/products/${id}`)
      setProduct(data)
    } catch (err) {
      setError('Producto no encontrado.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchProduct()
  }, [id])

  return { product, loading, error, retry: fetchProduct }
}

export function useFetchCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products/categories`)
      .then(({ data }) => setCategories(data))
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading }
}