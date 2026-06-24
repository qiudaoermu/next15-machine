import Link from 'next/link'
import products from '@/data/products.json'
import categories from '@/data/categories.json'
import { ProductDetail } from '@/components/products/ProductDetail'

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="py-20 bg-white">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    )
  }

  return <ProductDetail product={product} categories={categories} products={products} />
}
