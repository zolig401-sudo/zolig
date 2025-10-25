/**
 * Generate UploadThing file URL
 * Format: https://<APP_ID>.ufs.sh/f/<FILE_KEY>
 */
export function getUploadThingUrl(fileKey: string | null | undefined): string {
  if (!fileKey) {
    return '/placeholder-news.svg'
  }

  // Use NEXT_PUBLIC prefix for client-side access
  const appId = process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID || process.env.UPLOADTHING_APP_ID
  if (!appId) {
    console.warn('UPLOADTHING_APP_ID is not set')
    return '/placeholder-news.svg'
  }

  return `https://${appId}.ufs.sh/f/${fileKey}`
}

/**
 * Extract file key from UploadThing URL
 */
export function extractFileKey(url: string | null | undefined): string | null {
  if (!url) return null
  
  // If URL is already in the correct format
  if (url.includes('.ufs.sh/f/')) {
    const match = url.match(/\.ufs\.sh\/f\/(.+)$/)
    return match ? match[1] : null
  }
  
  // Extract from various URL formats
  const match = url.match(/\/([^\/]+)$/)
  return match ? match[1] : null
}
