<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import ProductsHero from '@/components/ProductsHero.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import PaginationBar from '@/components/PaginationBar.vue'
import { products, perPage } from '@/data/products'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const categoryKeyMap: Record<string, string> = {
  'candle-care-tools': 'candleCareTools',
  'packing-printing': 'packingPrinting',
  'garden-household-tools': 'gardenHouseholdTools',
}

const subKeyMap: Record<string, string> = {
  'candle-tray': 'candleTray',
  'care-tools-set': 'careToolsSet',
  'candle-lighter': 'candleLighter',
  'wick-dipper': 'wickDipper',
  'candle-snuffer': 'candleSnuffer',
  'wick-trimmer': 'wickTrimmer',
  'candle-wick-clip': 'candleWickClip',
  'glass-packaging': 'glassPackaging',
  'paper-box': 'paperBox',
  'garden-tools': 'gardenTools',
  'fabric-lace-scissors': 'fabricLaceScissors',
  'garden-scissors': 'gardenScissors',
}

const activeCategory = computed(() =>
  typeof route.query.category === 'string' ? route.query.category : undefined,
)
const activeSub = computed(() => (typeof route.query.sub === 'string' ? route.query.sub : undefined))
const activeKeyword = computed(() =>
  typeof route.query.keyword === 'string' ? route.query.keyword.trim().toLowerCase() : '',
)

const activeCategoryLabel = computed(() => {
  if (!activeCategory.value) return t('common.products')
  const key = categoryKeyMap[activeCategory.value]
  return key ? t(`menu.${key}`) : t('common.products')
})

const activeSubLabel = computed(() => {
  if (!activeSub.value) return undefined
  const key = subKeyMap[activeSub.value]
  return key ? t(`menu.${key}`) : undefined
})

const pageHeading = computed(() => activeSubLabel.value || activeCategoryLabel.value || t('common.allProducts'))

const filteredProducts = computed(() =>
  products.filter((item) => {
    const keywordOk = activeKeyword.value
      ? item.title.toLowerCase().includes(activeKeyword.value)
      : true
    if (!keywordOk) return false
    if (activeSub.value) return item.subCategorySlug === activeSub.value
    if (activeCategory.value) return item.categorySlug === activeCategory.value
    return true
  }),
)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / perPage)))

const currentPage = computed(() => {
  const raw = Number(route.query.page ?? '1')
  if (!Number.isFinite(raw)) return 1
  return Math.min(Math.max(1, Math.trunc(raw)), totalPages.value)
})

const pagedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return filteredProducts.value.slice(start, end)
})

const resultStart = computed(() =>
  filteredProducts.value.length === 0 ? 0 : (currentPage.value - 1) * perPage + 1,
)
const resultEnd = computed(() => Math.min(currentPage.value * perPage, filteredProducts.value.length))

function onPageChange(page: number) {
  router.push({
    query: {
      ...route.query,
      page: page === 1 ? undefined : String(page),
    },
  })
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <SiteHeader />
    <ProductsHero :title="pageHeading" />
    <main id="main" class="mx-auto max-w-7xl px-4 pb-16 pt-6 md:px-6 lg:px-8">
      <nav class="mb-10 text-sm text-text-secondary" aria-label="Breadcrumb">
        <RouterLink to="/" class="text-text-secondary no-underline hover:text-text-primary">
          {{ t('common.home') }}
        </RouterLink>
        <span class="mx-1">/</span>
        <RouterLink to="/products" class="text-text-secondary no-underline hover:text-text-primary">
          {{ t('common.products') }}
        </RouterLink>
        <template v-if="activeCategory || activeSub">
          <span class="mx-1">/</span>
          <span class="text-text-primary">{{ activeSubLabel || activeCategoryLabel }}</span>
        </template>
      </nav>

      <ProductGrid :items="pagedProducts" />

      <div class="mt-12 flex flex-col items-center gap-6">
        <PaginationBar :current-page="currentPage" :total-pages="totalPages" @change="onPageChange" />
        <p class="text-sm text-text-secondary" role="status">
          {{
            t('productsPage.showingResults', {
              start: resultStart,
              end: resultEnd,
              total: filteredProducts.length,
            })
          }}
        </p>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>
