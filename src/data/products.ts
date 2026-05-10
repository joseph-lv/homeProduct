import catalogPlaceholder from '@/assets/images/products.png'
import { spreadsheetProducts } from './spreadsheetCatalog'

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

/** Maps Excel 「大类目」to URL/query slug (see menu.ts). */
const MAIN_CATEGORY_SLUGS: Record<string, string> = {
  'Candle Care Tools': 'candle-care-tools',
  'Packing&Printing': 'packing-printing',
}

function categorySlugForMain(main: string): string {
  const slug = MAIN_CATEGORY_SLUGS[main]
  if (!slug) {
    console.warn(`[products] Unknown main category "${main}", falling back to candle-care-tools`)
    return 'candle-care-tools'
  }
  return slug
}

/** Matches submenu query keys, e.g. "candle tray" → candle-tray */
function subCategoryLabelToSlug(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function stripDescriptionPrefix(notes: string): string {
  return notes.replace(/^description[：:]\s*/i, '').trim()
}

function descriptionFromRow(title: string, notes: string | null): string {
  if (notes) return stripDescriptionPrefix(notes)
  return `${title} — Professional wholesale offering from CassieHome Tools. Contact us for catalogs, customization, and bulk pricing.`
}

function inferMaterial(title: string): string {
  const lower = title.toLowerCase()
  if (lower.includes('glass')) return 'Glass'
  if (lower.includes('tin')) return 'Tinplate'
  if (lower.includes('paper') || lower.includes('packaging') || lower.includes('box')) return 'Paper / board'
  if (lower.includes('scissors') || lower.includes('metal') || lower.includes('steel')) return 'Stainless Steel'
  return 'Mixed materials'
}

function inferFeatures(title: string): string[] {
  const lower = title.toLowerCase()
  if (lower.includes('lighter')) {
    return ['Windproof flame', 'Refillable design', 'Ergonomic grip']
  }
  if (lower.includes('jar') || lower.includes('cup') || lower.includes('tray')) {
    return ['Heat-resistant body', 'Reusable styling', 'Gift-friendly look']
  }
  if (lower.includes('packaging') || lower.includes('box')) {
    return ['Custom logo support', 'Protective structure', 'Eco-friendly options']
  }
  if (lower.includes('scissors') || lower.includes('trimmer') || lower.includes('wick')) {
    return ['Clean, precise cut', 'Durable metal build', 'Comfortable handling']
  }
  if (lower.includes('snuffer') || lower.includes('dipper')) {
    return ['Safe flame control', 'Matching candle-care aesthetic', 'Long-lasting finish']
  }
  return ['Premium finish', 'Stable quality', 'Suitable for wholesale programs']
}

function materialFromNotes(notes: string | null, title: string): string {
  if (notes) {
    const m = notes.match(/Material[：:]\s*([^\n]+)/i)
    if (m) return m[1].trim()
  }
  return inferMaterial(title)
}

function featuresFromNotes(notes: string | null, title: string): string[] {
  if (notes) {
    const body = stripDescriptionPrefix(notes)
    const lines = body.split('\n').map((l) => l.trim()).filter(Boolean)
    if (lines.length) return lines
  }
  return inferFeatures(title)
}

export const products: ProductItem[] = spreadsheetProducts.map((row) => ({
  id: row.id,
  title: row.title,
  href: `/products/${row.id}`,
  image: row.imagePublicPath ?? catalogPlaceholder,
  categorySlug: categorySlugForMain(row.mainCategory),
  subCategorySlug: subCategoryLabelToSlug(row.subCategoryLabel),
}))

export const totalResults = products.length
export const perPage = 8

export const productDetails: ProductDetail[] = spreadsheetProducts.map((row, index) => ({
  ...products[index],
  sku: `CHT-${row.id}`,
  category: row.mainCategory,
  material: materialFromNotes(row.detailNotes, row.title),
  description: descriptionFromRow(row.title, row.detailNotes),
  features: featuresFromNotes(row.detailNotes, row.title),
}))

export function getProductDetailById(id: number): ProductDetail | undefined {
  return productDetails.find((item) => item.id === id)
}
