"use client"

import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string
  className?: string
}

export function OptimizedImage({ src, className, alt, ...props }: OptimizedImageProps) {
  const isExternal = src.startsWith("http")

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt || "Imagen"}
      className={cn("transition-all", className)}
      unoptimized={isExternal}
      {...props}
    />
  )
}

