# Next.js 15 电商项目 (E-commerce Shop)

一个基于 Next.js 15 构建的现代化电商平台，展示了最新的 React 和 Next.js 技术栈的最佳实践。

## 🚀 项目特性

### 核心功能
- **用户认证系统** - 注册、登录、个人资料管理
- **商品展示** - 商品列表、详情页、分类浏览
- **购物车功能** - 添加商品、数量管理、价格计算
- **收藏系统** - 商品收藏、收藏列表管理
- **订单管理** - 下单、订单历史、订单详情
- **搜索筛选** - 商品搜索、分类筛选、价格筛选
- **响应式设计** - 支持桌面端和移动端

### 技术亮点
- **Next.js 15** - 最新版本的 React 框架
- **App Router** - 使用新的 App 目录结构
- **TypeScript** - 完整的类型安全
- **Tailwind CSS** - 现代化的 CSS 框架
- **MongoDB** - NoSQL 数据库
- **NextAuth.js** - 身份验证解决方案
- **Zustand** - 轻量级状态管理
- **Server Components** - React 服务器组件

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 15.4.4
- **语言**: TypeScript 5.8.3
- **样式**: Tailwind CSS 3.4.17
- **UI组件**: Radix UI, Lucide React
- **状态管理**: Zustand 4.5.7
- **表单验证**: Zod 3.25.76

### 后端
- **API**: Next.js API Routes
- **数据库**: MongoDB 6.18.0
- **身份验证**: NextAuth.js 4.24.11
- **密码加密**: bcryptjs 2.4.3

### 开发工具
- **包管理器**: pnpm
- **代码规范**: ESLint
- **构建工具**: Next.js 内置
- **部署**: Vercel

## 📁 项目结构

next15-shop/
├── app/                    # App Router 目录
│   ├── api/               # API 路由
│   │   ├── auth/          # 身份验证 API
│   │   ├── products/      # 商品 API
│   │   ├── orders/        # 订单 API
│   │   └── favorites/     # 收藏 API
│   ├── products/          # 商品页面
│   ├── cart/              # 购物车页面
│   ├── user/              # 用户相关页面
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── ui/                # 基础 UI 组件
│   ├── layout/            # 布局组件
│   ├── products/          # 商品相关组件
│   └── cart/              # 购物车组件
├── lib/                   # 工具库
│   ├── mongodb.ts         # 数据库连接
│   ├── types.ts           # TypeScript 类型定义
│   └── utils.ts           # 工具函数
├── store/                 # 状态管理
│   ├── cart.ts            # 购物车状态
│   └── favorites.ts       # 收藏状态
└── types/                 # 类型声明文件



## 🚀 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- pnpm (推荐) 或 npm
- MongoDB 数据库

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/next15-shop.git
cd next15-shop
```

2. **安装依赖**
```bash
pnpm install
# 或
npm install
```

3. **环境配置**

创建 `.env.local` 文件：
```env
# MongoDB 连接字符串
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# NextAuth 配置
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Stripe 支付配置 (可选)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

4. **初始化数据库**
```bash
node scripts/seed.js
```

5. **启动开发服务器**
```bash
pnpm dev
# 或
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看项目。

## 📦 部署

### Vercel 部署 (推荐)

1. **连接 GitHub**
   - 在 [Vercel](https://vercel.com) 上导入你的 GitHub 仓库

2. **配置环境变量**
   在 Vercel 项目设置中添加以下环境变量：
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

3. **自动部署**
   - 推送代码到 main 分支即可自动部署

### 其他部署方式

#### Docker 部署
```bash
# 构建镜像
docker build -t next15-shop .

# 运行容器
docker run -p 3000:3000 --env-file .env.local next15-shop
```

#### 传统服务器部署
```bash
# 构建项目
pnpm build

# 启动生产服务器
pnpm start
```

## 🔧 开发指南

### 添加新功能

1. **创建 API 路由**
```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // API 逻辑
  return NextResponse.json({ data: 'example' })
}
```

2. **创建页面组件**
```typescript
// app/example/page.tsx
export default function ExamplePage() {
  return <div>Example Page</div>
}
```

3. **添加类型定义**
```typescript
// lib/types.ts
export interface ExampleType {
  id: string
  name: string
}
```

### 数据库操作

```typescript
// lib/mongodb.ts 使用示例
import { getCollection } from '@/lib/mongodb'

const collection = await getCollection('products')
const products = await collection.find({}).toArray()
```

### 状态管理

```typescript
// store/example.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ExampleStore {
  data: string
  setData: (data: string) => void
}

export const useExampleStore = create<ExampleStore>()()
```

## 🧪 测试

```bash
# 类型检查
npx tsc --noEmit

# 代码规范检查
pnpm lint

# 构建测试
pnpm build
```

## 📝 API 文档

### 认证 API
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/signin` - 用户登录
- `POST /api/auth/signout` - 用户登出

### 商品 API
- `GET /api/products` - 获取商品列表
- `GET /api/products/[id]` - 获取商品详情
- `GET /api/categories` - 获取分类列表

### 购物车 API
- `GET /api/cart` - 获取购物车
- `POST /api/cart` - 添加到购物车
- `PUT /api/cart` - 更新购物车
- `DELETE /api/cart` - 删除购物车项目

### 订单 API
- `GET /api/orders` - 获取订单列表
- `POST /api/orders` - 创建订单
- `GET /api/orders/[id]` - 获取订单详情

### 收藏 API
- `GET /api/favorites` - 获取收藏列表
- `POST /api/favorites` - 添加/移除收藏

### 用户 API
- `GET /api/user/profile` - 获取用户资料
- `PUT /api/user/profile` - 更新用户资料

## 🎯 学习要点

### Next.js 15 新特性
- **App Router** - 新的路由系统
- **Server Components** - 服务器端组件
- **Streaming** - 流式渲染
- **Suspense** - 数据获取边界

### 最佳实践
- **TypeScript** - 类型安全的开发
- **组件化** - 可复用的 UI 组件
- **状态管理** - Zustand 轻量级状态管理
- **API 设计** - RESTful API 设计
- **错误处理** - 完善的错误处理机制

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [MongoDB](https://www.mongodb.com/) - 数据库
- [NextAuth.js](https://next-auth.js.org/) - 身份验证
- [Vercel](https://vercel.com/) - 部署平台
- [Zustand](https://github.com/pmndrs/zustand) - 状态管理

## 📞 联系方式

如果你有任何问题或建议，请通过以下方式联系：

- GitHub Issues: [项目 Issues](https://github.com/your-username/next15-shop/issues)
- Email: your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！

## 🔗 相关链接

- [Next.js 官方文档](https://nextjs.org/docs)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- [MongoDB 官方文档](https://docs.mongodb.com/)
- [NextAuth.js 官方文档](https://next-auth.js.org/)