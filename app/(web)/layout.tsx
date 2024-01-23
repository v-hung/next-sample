import React, { ReactNode } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { findSettingByName } from '@/lib/admin/fields';
import db from '@/lib/admin/db';
import { getSettingsData } from '@/actions/admin/settings';
import { getAdmin } from '@/actions/admin/admin';
import PreviewWithAuth from '@/components/web/PreviewWithAuth';
import { AuthProvider } from '@/components/web/AuthProviders';
import WebRootLayout from '@/components/web/layouts/WebRootLayout';
import { auth } from '@/auth.config';
import { createAccess } from '@/actions/access';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettingsData()

  const siteTitle = findSettingByName(settings, "site title")
  const siteDescription = findSettingByName(settings, "site description")
  const siteLogo = findSettingByName(settings, "site logo")
 
  return {
    metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
    title: siteTitle || "Việt Hùng It",
    description: siteDescription || 'Việt Hùng It lập trình viên web, mobile, hệ thống',
    authors: {
      name: 'Việt Hùng It',
      url: 'https://github.com/v-hung'
    },
    twitter: {
      title: siteTitle || "Việt Hùng It",
      description: siteDescription || 'Việt Hùng It lập trình viên web, mobile, hệ thống',
      images: siteLogo ? siteLogo?.url : null,
    },
    openGraph: {
      title: siteTitle || "Việt Hùng It",
      description: siteDescription || 'Việt Hùng It lập trình viên web, mobile, hệ thống',
      url: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
      siteName: siteTitle || "Việt Hùng It",
      images: siteLogo ? siteLogo?.url : null,
      type: 'website',
    },
  }
}


const layout = async ({children}: {children: ReactNode}) => {
  const [settings, access, session] = await Promise.all([
    getSettingsData(),
    createAccess(),
    auth()
  ]);

  const previewWhenLogging = findSettingByName(settings, "preview mode") as boolean | null

  if (previewWhenLogging) {
    const user = await getAdmin()

    if (!user) {
      return <PreviewWithAuth />
    }
  }

  return (
    <AuthProvider session={session}>
      <WebRootLayout children={children} />
    </AuthProvider>
  )
}

export default layout