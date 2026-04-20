<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import { getProductDetailById, products } from '@/data/products'
import { useI18n } from '@/i18n'

const route = useRoute()
const { t } = useI18n()

const productId = computed(() => Number(route.params.id))
const product = computed(() => getProductDetailById(productId.value))

const related = computed(() => {
  if (!product.value) return products.slice(0, 4)
  return products.filter((item) => item.id !== product.value?.id).slice(0, 4)
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <SiteHeader />
    <main id="main" class="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-6 lg:px-8">
      <nav class="mb-8 text-sm text-text-secondary" aria-label="Breadcrumb">
        <RouterLink to="/" class="text-text-secondary no-underline hover:text-text-primary">{{ t('common.home') }}</RouterLink>
        <span class="mx-1">/</span>
        <RouterLink to="/products" class="text-text-secondary no-underline hover:text-text-primary">{{ t('common.products') }}</RouterLink>
        <span class="mx-1">/</span>
        <span class="text-text-primary">{{ product?.title || t('productDetail.title') }}</span>
      </nav>

      <section v-if="product" class="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div class="overflow-hidden rounded-lg border border-surface-border bg-surface-muted">
          <img :src="product.image" :alt="product.title" class="aspect-square w-full object-cover" />
        </div>

        <div>
          <h1 class="text-3xl font-semibold text-text-primary">{{ product.title }}</h1>
          <p class="mt-2 text-sm text-text-secondary">{{ t('productDetail.sku') }}: {{ product.sku }}</p>

          <p class="mt-6 leading-relaxed text-text-secondary">
            {{ product.description }}
          </p>

          <div class="mt-6 grid gap-3 rounded-lg border border-surface-border bg-[#fafafa] p-4 text-sm">
            <p><span class="font-semibold text-text-primary">{{ t('productDetail.category') }}:</span> <span class="text-text-secondary">{{ product.category }}</span></p>
            <p><span class="font-semibold text-text-primary">{{ t('productDetail.material') }}:</span> <span class="text-text-secondary">{{ product.material }}</span></p>
          </div>

          <div class="mt-6">
            <h2 class="text-base font-semibold text-text-primary">{{ t('productDetail.features') }}</h2>
            <ul class="mt-3 m-0 list-none space-y-2 p-0 text-sm text-text-secondary">
              <li v-for="feature in product.features" :key="feature" class="flex items-start gap-2">
                <span class="mt-1 h-1.5 w-1.5 rounded-full bg-text-primary" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink
              to="/contact-us"
              class="inline-flex items-center rounded bg-text-primary px-5 py-2.5 text-sm font-medium text-white no-underline hover:opacity-90"
            >
              {{ t('productDetail.inquiry') }}
            </RouterLink>
            <RouterLink
              to="/products"
              class="inline-flex items-center rounded border border-surface-border px-5 py-2.5 text-sm font-medium text-text-primary no-underline hover:bg-surface-muted"
            >
              {{ t('productDetail.backToProducts') }}
            </RouterLink>
          </div>
        </div>
      </section>

      <section v-else class="rounded-lg border border-surface-border p-10 text-center">
        <h1 class="text-2xl font-semibold text-text-primary">{{ t('productDetail.notFound') }}</h1>
        <RouterLink to="/products" class="mt-5 inline-flex rounded bg-text-primary px-5 py-2.5 text-sm text-white no-underline hover:opacity-90">
          {{ t('productDetail.backToProducts') }}
        </RouterLink>
      </section>

      <section class="mt-16">
        <h2 class="mb-6 text-2xl font-semibold text-text-primary">{{ t('productDetail.relatedProducts') }}</h2>
        <ProductGrid :items="related" />
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
