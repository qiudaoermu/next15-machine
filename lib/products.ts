import { ObjectId } from 'mongodb'
import { getCollection } from './mongodb'
import { Product, Category } from './types'

export async function getProduct(id: string) {
  try {
    const productsCollection = await getCollection('products')
    const categoriesCollection = await getCollection('categories')
    
    const product = await productsCollection.findOne({ 
      _id: new ObjectId(id),
      isActive: true 
    })
    
    if (!product) return null
    
    // 获取分类信息
    const category = await categoriesCollection.findOne({ 
      _id: product.categoryId 
    })
    
    // 使用 serializeProduct 函数来正确序列化数据
    return serializeProduct({
      ...product,
      category
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getRelatedProducts(productId: string, limit = 4) {
  try {
    const productsCollection = await getCollection('products')
    const categoriesCollection = await getCollection('categories')
    
    // 先获取当前产品的分类
    const currentProduct = await productsCollection.findOne({ 
      _id: new ObjectId(productId) 
    })
    
    if (!currentProduct) return []
    
    // 查找同分类的其他产品
    const products = await productsCollection
      .find({
        categoryId: currentProduct.categoryId,
        _id: { $ne: new ObjectId(productId) },
        isActive: true
      })
      .limit(limit)
      .toArray()
    
    // 获取分类信息
    const categoryIds = [...new Set(products.map(p => p.categoryId))]
    const categories = await categoriesCollection
      .find({ _id: { $in: categoryIds } })
      .toArray()
    
    const categoryMap = new Map(categories.map(c => [c._id.toString(), c]))
    
    // 使用 serializeProduct 函数来正确序列化数据
    return products.map(product => serializeProduct({
      ...product,
      category: categoryMap.get(product.categoryId.toString())
    }))
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}

// 在现有代码基础上，更新所有返回函数以正确序列化 ObjectId

// 添加一个辅助函数来序列化产品数据
function serializeProduct(product: any) {
  return {
    ...product,
    _id: product._id.toString(),
    categoryId: product.categoryId.toString(),
    id: product._id.toString(),
    category: product.category ? {
      ...product.category,
      _id: product.category._id.toString(),
      id: product.category._id.toString()
    } : null
  }
}

// 更新 getFeaturedProducts 函数
export async function getFeaturedProducts(limit = 8) {
  try {
    const productsCollection = await getCollection('products')
    const categoriesCollection = await getCollection('categories')
    
    const products = await productsCollection
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()
    
    // 获取分类信息
    const categoryIds = [...new Set(products.map(p => p.categoryId))]
    const categories = await categoriesCollection
      .find({ _id: { $in: categoryIds } })
      .toArray()
    
    const categoryMap = new Map(categories.map(c => [c._id.toString(), c]))
    
    return products.map(product => serializeProduct({
      ...product,
      category: categoryMap.get(product.categoryId.toString())
    }))
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

// 更新 getCategories 函数
// Make sure your getCategories function returns complete category objects
export async function getCategories() {
  try {
    const categoriesCollection = await getCollection('categories')
    const categories = await categoriesCollection
      .find({})
      .sort({ name: 1 })
      .toArray()
    
    return categories.map(category => ({
      _id: category._id.toString(),
      id: category._id.toString(),
      name: category.name,
      slug: category.slug,
      description: category.description,
      createdAt: category.createdAt
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function searchProducts({
  category,
  search,
  sort = 'createdAt',
  page = 1,
  limit = 12,
  minPrice,
  maxPrice
}: {
  category?: string
  search?: string
  sort?: string
  page?: number
  limit?: number
  minPrice?: string
  maxPrice?: string
}) {
  try {
    const productsCollection = await getCollection('products')
    const categoriesCollection = await getCollection('categories')
    
    // 构建查询条件
    const query: any = { isActive: true }
    
    if (category) {
      const categoryDoc = await categoriesCollection.findOne({ slug: category })
      if (categoryDoc) {
        query.categoryId = categoryDoc._id
      }
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }
    
    // 价格筛选逻辑
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = parseFloat(minPrice)
      if (maxPrice) query.price.$lte = parseFloat(maxPrice)
    }
    
    // 构建排序
    const sortObj: any = {}
    if (sort === 'price') {
      sortObj.price = 1
    } else if (sort === '-price') {
      sortObj.price = -1
    } else {
      sortObj[sort] = -1
    }
    
    const skip = (page - 1) * limit
    
    const [products, total] = await Promise.all([
      productsCollection
        .find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .toArray(),
      productsCollection.countDocuments(query)
    ])
    
    // 获取分类信息
    const categoryIds = [...new Set(products.map(p => p.categoryId))]
    const categories = await categoriesCollection
      .find({ _id: { $in: categoryIds } })
      .toArray()
    
    const categoryMap = new Map(categories.map(c => [c._id.toString(), c]))
    
    const productsWithCategory = products.map(product => serializeProduct({
      ...product,
      category: categoryMap.get(product.categoryId.toString())
    }))
    
    return {
      products: productsWithCategory,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Error searching products:', error)
    return {
      products: [],
      pagination: { page: 1, limit, total: 0, pages: 0 }
    }
  }
}