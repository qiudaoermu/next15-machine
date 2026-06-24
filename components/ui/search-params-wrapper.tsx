'use client'

import { Suspense, ReactNode } from 'react'

interface SearchParamsWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function SearchParamsWrapper({ children, fallback }: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={fallback || <div>加载中...</div>}>
      {children}
    </Suspense>
  )
}