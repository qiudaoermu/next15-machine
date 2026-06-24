'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();

  // 不显示面包屑的页面
  const hiddenPaths = ["/", "/user/login", "/user/register"];
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  // 自动生成面包屑项目
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // 路径映射
    const pathMap: Record<string, string> = {
      products: "商品",
      categories: "分类",
      cart: "购物车",
      checkout: "结算",
      user: "用户中心",
      profile: "个人资料",
      orders: "我的订单",
      favorites: "我的收藏",
    };

    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // 跳过动态路由参数（纯数字或UUID）
      if (/^[0-9a-f-]+$/i.test(segment)) {
        if (pathSegments[index - 1] === "products") {
          breadcrumbs.push({
            label: "商品详情",
            href: currentPath,
          });
        } else if (pathSegments[index - 1] === "orders") {
          breadcrumbs.push({
            label: "订单详情",
            href: currentPath,
          });
        }
        return;
      }

      const label = pathMap[segment] || segment;
      breadcrumbs.push({
        label,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  // 在 generateBreadcrumbs 函数中
  const nonClickablePaths = ["/user"]; // 不可点击的路径
  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="container flex items-center py-8 mx-auto space-x-2 text-sm text-gray-600">
      {/* 首页链接 */}
      <Link
        href="/"
        className="flex items-center transition-colors hover:text-blue-600"
      >
        <HomeIcon className="w-4 h-4" />
        <span className="ml-1">首页</span>
      </Link>

      {/* 面包屑项目 */}
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRightIcon className="mx-2 w-4 h-4 text-gray-400" />
          {index === breadcrumbs.length - 1 ||
          nonClickablePaths.includes(item.href) ? (
            <span className="font-medium text-gray-900">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="transition-colors hover:text-blue-600"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}