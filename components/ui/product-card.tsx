'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCartStore } from '@/store/cart'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder.jpg',
      stock: product.stock
    })
    toast.success('商品已添加到购物车')
  }

  return (
    <Link href={`/products/${product._id}`} className="group">
      <div className="overflow-hidden bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg">
        <div className="relative aspect-square">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.stock === 0 && (
            <div className="flex absolute inset-0 justify-center items-center bg-black bg-opacity-50">
              <span className="font-semibold text-white">缺货</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="mb-2 font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2 w-full max-w-[200px] truncate" title={product.description}>
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-600">
              ¥{product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="p-2 text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}