export interface ProductItem {
  id: number
  title: string
  href: string
  image: string
  categorySlug?: string
  subCategorySlug?: string
}

export interface ProductDetail extends ProductItem {
  sku: string
  category: string
  material: string
  description: string
  features: string[]
}

/** Seed products from reference site */
const seedProducts: ProductItem[] = [
  {
    id: 2194,
    title: 'Crystal Fireless Aromatherapy',
    href: 'https://lajtulipshouse.com/product/crystal-fireless-aromatherapy/',
    image:
      'https://lajtulipshouse.com/wp-content/uploads/2025/04/Crystal-Fireless-Aromatherapy-4.jpg',
  },
  {
    id: 2192,
    title: 'Crystal Cup Fireless Aromatherapy',
    href: 'https://lajtulipshouse.com/product/crystal-cup-fireless-aromatherapy/',
    image:
      'https://lajtulipshouse.com/wp-content/uploads/2025/04/Crystal-Cup-Fireless-Aromatherapy-3.jpg',
  },
  {
    id: 2172,
    title: 'Blue Ocean Fireless Aromatherapy',
    href: 'https://lajtulipshouse.com/product/blue-ocean-fireless-aromatherapy/',
    image:
      'https://lajtulipshouse.com/wp-content/uploads/2025/04/Blue-Ocean-Fireless-Aromatherapy-3-1.jpg',
  },
  {
    id: 2168,
    title: 'Premium Leather Scented Candle',
    href: 'https://lajtulipshouse.com/product/premium-leather-scented-candle/',
    image:
      'https://lajtulipshouse.com/wp-content/uploads/2025/04/Premium-Leather-Scented-Candle-1.jpg',
  },
  {
    id: 2167,
    title: 'Postbox scented candle',
    href: 'https://lajtulipshouse.com/product/postbox-scented-candle/',
    image: 'https://lajtulipshouse.com/wp-content/uploads/2025/04/Postbox-scented-candle-4.jpg',
  },
  {
    id: 2165,
    title: 'Smokeless Wood Wick Scented Candle',
    href: 'https://lajtulipshouse.com/product/smokeless-wood-wick-scented-candle/',
    image:
      'https://lajtulipshouse.com/wp-content/uploads/2025/04/Smokeless-Wood-Wick-Scented-Candle-1.jpg',
  },
  {
    id: 2163,
    title: 'Tinplate cans scented candle',
    href: 'https://lajtulipshouse.com/product/tinplate-cans-scented-candle/',
    image:
      'https://lajtulipshouse.com/wp-content/uploads/2025/04/Tinplate-cans-scented-candle-2.jpg',
  },
  {
    id: 2160,
    title: 'Wood Wick Scented Candle',
    href: 'https://lajtulipshouse.com/product/wood-wick-scented-candle/',
    image:
      'https://lajtulipshouse.com/wp-content/uploads/2025/04/Wood-Wick-Scented-Candle-4-1024x1024.jpg',
  },
]

/** Static mock products for pagination demo */
const mockTitles = [
  'Matte Black Candle Lighter',
  'Nordic Glass Candle Jar',
  'Vintage Brass Wick Trimmer',
  'Aroma Diffuser Refill Set',
  'Minimalist Candle Snuffer',
  'Handcrafted Soy Wax Candle',
  'Amber Decorative Candle Cup',
  'Scented Travel Tin Candle',
  'Natural Reed Diffuser Bottle',
  'Premium Gift Box Packaging',
  'Luxury Paper Box Collection',
  'Garden Hand Pruning Shears',
  'Fabric Lace Precision Scissors',
  'Multi-use Household Garden Kit',
  'Ceramic Candle Tray Set',
  'Wedding Favor Candle Jar',
  'Seasonal Fragrance Candle Series',
  'Rechargeable USB Candle Lighter',
  'Portable Wick Dipper Tool',
  'Frosted Glass Diffuser Set',
  'Eco-friendly Packaging Bundle',
  'Home Decor Candle Holder',
  'Classic Round Candle Tin',
  'Deluxe Aromatherapy Gift Set',
]

const mockProducts: ProductItem[] = mockTitles.map((title, index) => {
  const seed = seedProducts[index % seedProducts.length]
  return {
    id: 5000 + index,
    title,
    href: `/products/${5000 + index}`,
    image: seed.image,
  }
})

const categoryMap = [
  {
    category: 'candle-care-tools',
    subs: [
      'candle-tray',
      'care-tools-set',
      'candle-lighter',
      'wick-dipper',
      'candle-snuffer',
      'wick-trimmer',
      'candle-wick-clip',
    ],
  },
  {
    category: 'packing-printing',
    subs: ['glass-packaging', 'paper-box'],
  },
  {
    category: 'garden-household-tools',
    subs: ['garden-tools', 'fabric-lace-scissors', 'garden-scissors'],
  },
] as const

export const products: ProductItem[] = [...seedProducts, ...mockProducts].map((item, index) => {
  const group = categoryMap[index % categoryMap.length]
  const sub = group.subs[index % group.subs.length]
  return {
    ...item,
    href: `/products/${item.id}`,
    categorySlug: group.category,
    subCategorySlug: sub,
  }
})
export const totalResults = products.length
export const perPage = 8

function inferCategory(title: string): string {
  const lower = title.toLowerCase()
  if (lower.includes('lighter') || lower.includes('wick') || lower.includes('snuffer') || lower.includes('tray')) {
    return 'Candle Care Tools'
  }
  if (lower.includes('box') || lower.includes('packaging')) {
    return 'Packing&Printing'
  }
  if (lower.includes('garden') || lower.includes('scissors') || lower.includes('pruning')) {
    return 'Garden&Household Tools'
  }
  return 'Scent Candle'
}

function inferMaterial(title: string): string {
  const lower = title.toLowerCase()
  if (lower.includes('glass')) return 'Glass'
  if (lower.includes('tin')) return 'Tinplate'
  if (lower.includes('paper') || lower.includes('box')) return 'Paper'
  if (lower.includes('scissors') || lower.includes('metal') || lower.includes('lighter')) return 'Stainless Steel'
  return 'Mixed Materials'
}

function inferFeatures(title: string): string[] {
  const lower = title.toLowerCase()
  if (lower.includes('lighter')) {
    return ['Windproof flame', 'Refillable design', 'Ergonomic grip']
  }
  if (lower.includes('jar') || lower.includes('cup')) {
    return ['Heat-resistant body', 'Reusable container', 'Gift-friendly style']
  }
  if (lower.includes('packaging') || lower.includes('box')) {
    return ['Custom logo support', 'Protective structure', 'Eco-friendly options']
  }
  if (lower.includes('scissors') || lower.includes('pruning')) {
    return ['Sharp precision blades', 'Durable construction', 'Comfort handle']
  }
  return ['Premium finish', 'Stable quality', 'Suitable for bulk orders']
}

export const productDetails: ProductDetail[] = products.map((item) => ({
  ...item,
  sku: `LJH-${item.id}`,
  category: inferCategory(item.title),
  material: inferMaterial(item.title),
  description:
    `Designed for export-focused wholesale buyers, ${item.title} combines practical use with a clean visual style. ` +
    'It fits both retail-ready packaging programs and custom private label projects.',
  features: inferFeatures(item.title),
}))

export function getProductDetailById(id: number): ProductDetail | undefined {
  return productDetails.find((item) => item.id === id)
}
