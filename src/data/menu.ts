export interface MenuChild {
  key: string
  href: string
  children?: MenuChild[]
}

export interface TopNavItem {
  key: 'home' | 'products' | 'aboutUs' | 'contactUs'
  href: string
  children?: MenuChild[]
  external?: boolean
}

export const topNav: TopNavItem[] = [
  { key: 'home', href: '/' },
  {
    key: 'products',
    href: '/products',
    children: [
      {
        key: 'candleCareTools',
        href: '/products?category=candle-care-tools',
        children: [
          { key: 'candleTray', href: '/products?category=candle-care-tools&sub=candle-tray' },
          { key: 'careToolsSet', href: '/products?category=candle-care-tools&sub=care-tools-set' },
          { key: 'candleLighter', href: '/products?category=candle-care-tools&sub=candle-lighter' },
          { key: 'wickDipper', href: '/products?category=candle-care-tools&sub=wick-dipper' },
          { key: 'candleSnuffer', href: '/products?category=candle-care-tools&sub=candle-snuffer' },
          { key: 'wickTrimmer', href: '/products?category=candle-care-tools&sub=wick-trimmer' },
          { key: 'candleWickClip', href: '/products?category=candle-care-tools&sub=candle-wick-clip' },
        ],
      },
      {
        key: 'packingPrinting',
        href: '/products?category=packing-printing',
        children: [
          { key: 'glassPackaging', href: '/products?category=packing-printing&sub=glass-packaging' },
          { key: 'paperBox', href: '/products?category=packing-printing&sub=paper-box' },
        ],
      },
      {
        key: 'gardenHouseholdTools',
        href: '/products?category=garden-household-tools',
        children: [
          { key: 'gardenTools', href: '/products?category=garden-household-tools&sub=garden-tools' },
          { key: 'fabricLaceScissors', href: '/products?category=garden-household-tools&sub=fabric-lace-scissors' },
          { key: 'gardenScissors', href: '/products?category=garden-household-tools&sub=garden-scissors' },
        ],
      },
    ],
  },
  { key: 'aboutUs', href: '/about-us' },
  { key: 'contactUs', href: '/contact-us' },
]

/** Placeholder profile URLs for CassieHome Tools (header uses buttons + construction notice until links go live). */
export const socialLinks = [
  { href: 'https://www.tiktok.com/@cassiehometools', label: 'TikTok', icon: 'tiktok' as const },
  { href: 'https://www.facebook.com/cassiehometools', label: 'Facebook', icon: 'facebook' as const },
  { href: 'https://www.instagram.com/cassiehometools/', label: 'Instagram', icon: 'instagram' as const },
  {
    href: 'https://www.linkedin.com/company/cassiehometools/',
    label: 'LinkedIn',
    icon: 'linkedin' as const,
  },
  { href: 'https://www.youtube.com/@cassiehometools', label: 'YouTube', icon: 'youtube' as const },
]
