import db from '@/lib/admin/db'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || ""

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    }
  ]
}