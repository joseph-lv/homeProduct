<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { topNav, socialLinks } from '@/data/menu'
import SocialIcon from '@/components/icons/SocialIcon.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useI18n } from '@/i18n'

const searchOpen = ref(false)
const mobileOpen = ref(false)
const searchKeyword = ref('')
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

function linkProps(item: (typeof topNav)[number]) {
  if (item.key === 'home') return { to: '/' as const }
  if (item.key === 'products') return { to: '/products' as const }
  if (item.key === 'aboutUs') return { to: '/about-us' as const }
  if (item.key === 'contactUs') return { to: '/contact-us' as const }
  return null
}

function closeMobile() {
  mobileOpen.value = false
}

function onCategoryCardClick(href: string, event: MouseEvent) {
  const target = event.target as HTMLElement
  if (target.closest('a,button')) return
  router.push(href)
}

function goTopCategory(href: string) {
  const [path, queryString] = href.split('?')
  if (!queryString) {
    router.push(path || '/products')
    return
  }
  const params = new URLSearchParams(queryString)
  const category = params.get('category')
  router.push({
    path: path || '/products',
    query: category ? { category } : {},
  })
}

function openSearch() {
  searchKeyword.value = typeof route.query.keyword === 'string' ? route.query.keyword : ''
  searchOpen.value = true
}

function submitSearch() {
  const keyword = searchKeyword.value.trim()
  router.push({
    path: '/products',
    query: {
      keyword: keyword || undefined,
    },
  })
  searchOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-surface-border bg-white">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow"
    >
      Skip to main content
    </a>
    <div class="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8 xl:pr-44">
      <div class="absolute right-4 top-2 z-30 hidden xl:block">
        <LanguageSwitcher />
      </div>
      <RouterLink to="/" class="shrink-0" @click="closeMobile">
        <img
          src="https://lajtulipshouse.com/wp-content/uploads/2025/03/lajhouse-logo-1.png"
          alt="lajtulipshouse.com"
          class="h-8 w-auto max-w-[min(100%,280px)] md:h-9"
          width="249"
          height="22"
        />
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden flex-1 items-center justify-center xl:flex" aria-label="Main">
        <ul class="m-0 list-none flex flex-wrap items-center gap-x-4 gap-y-2 p-0 lg:gap-x-5">
          <li v-for="item in topNav" :key="item.key" class="relative group">
            <template v-if="linkProps(item)">
              <RouterLink
                v-if="item.key !== 'products'"
                :to="linkProps(item)?.to || '/'"
                class="nav-link"
              >
                {{ t(`common.${item.key}`) }}
              </RouterLink>
              <div v-else class="flex items-center gap-0.5">
                <RouterLink to="/products" class="nav-link">{{ t('common.products') }}</RouterLink>
                <button
                  type="button"
                  class="flex h-6 w-6 items-center justify-center rounded border-0 bg-transparent p-0 text-text-primary outline-none ring-0 hover:text-black focus-visible:ring-1 focus-visible:ring-surface-border"
                  aria-expanded="false"
                  :aria-label="t('header.productsSubmenu')"
                  tabindex="-1"
                >
                  <svg class="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M1.5 4L6 8L10.5 4"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </template>
            <a
              v-else
              :href="item.href"
              class="nav-link"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
            >
              {{ t(`common.${item.key}`) }}
            </a>

            <!-- Products dropdown -->
            <div
              v-if="item.key === 'products' && item.children"
              class="pointer-events-none invisible absolute left-1/2 top-full z-50 pt-3 opacity-0 transition-all duration-180 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
              style="transform: translateX(-50%)"
            >
              <div class="w-[min(92vw,760px)] rounded-xl border border-surface-border bg-white p-5 shadow-[0_20px_45px_rgba(0,0,0,0.14)]">
                <div class="mb-4 flex items-center justify-between border-b border-surface-border pb-3">
                  <p class="text-sm font-semibold tracking-wide text-text-primary">{{ t('header.productsCategory') }}</p>
                  <RouterLink
                    to="/products"
                    class="text-xs font-medium text-text-secondary no-underline transition hover:text-text-primary"
                  >
                    {{ t('header.viewAllProducts') }} →
                  </RouterLink>
                </div>
                <ul class="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
                  <li
                    v-for="cat in item.children"
                    :key="cat.key"
                    class="cursor-pointer rounded-lg border border-surface-border bg-[#fbfbfb] p-3 transition hover:border-[#d6d6d6] hover:bg-white"
                    @click="onCategoryCardClick(cat.href, $event)"
                  >
                    <RouterLink
                      :to="cat.href"
                      class="mb-2 block border-b border-surface-border pb-2 text-sm font-semibold text-text-primary no-underline hover:text-black"
                      @click.prevent="goTopCategory(cat.href)"
                    >
                      {{ t(`menu.${cat.key}`) }}
                    </RouterLink>
                    <ul
                      v-if="cat.children?.length"
                      class="m-0 list-none space-y-1.5 p-0"
                    >
                      <li v-for="sub in cat.children" :key="sub.key">
                        <RouterLink
                          :to="sub.href"
                          class="block text-xs text-text-secondary no-underline transition hover:pl-1 hover:text-text-primary"
                        >
                          · {{ t(`menu.${sub.key}`) }}
                        </RouterLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-3">
        <ul class="m-0 list-none flex items-center gap-2 p-0 text-text-primary md:gap-2.5">
          <li v-for="s in socialLinks" :key="s.href">
            <a
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-8 items-center justify-center rounded bg-surface-muted text-text-primary transition hover:bg-surface-border"
              :aria-label="s.label"
            >
              <SocialIcon :name="s.icon" />
            </a>
          </li>
        </ul>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded border-0 bg-surface-muted p-0 text-text-primary outline-none ring-0 transition hover:bg-surface-border"
          :aria-label="t('common.searchSite')"
          @click="openSearch"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </button>

        <button
          type="button"
          class="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded xl:hidden"
          :aria-expanded="mobileOpen"
          :aria-label="t('header.openMobileMenu')"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="h-0.5 w-6 bg-text-primary transition" :class="mobileOpen ? 'translate-y-2 rotate-45' : ''" />
          <span class="h-0.5 w-6 bg-text-primary" :class="mobileOpen ? 'opacity-0' : ''" />
          <span
            class="h-0.5 w-6 bg-text-primary transition"
            :class="mobileOpen ? '-translate-y-2 -rotate-45' : ''"
          />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-show="mobileOpen"
      class="border-t border-surface-border bg-white px-4 py-4 xl:hidden"
    >
      <nav aria-label="Mobile">
        <ul class="m-0 list-none space-y-3 p-0">
          <li v-for="item in topNav" :key="`m-${item.key}`">
            <template v-if="linkProps(item) && item.key !== 'products'">
              <RouterLink :to="linkProps(item)?.to || '/'" class="block text-text-primary" @click="closeMobile">
                {{ t(`common.${item.key}`) }}
              </RouterLink>
            </template>
            <template v-else-if="item.key === 'products'">
              <RouterLink
                to="/products"
                class="block font-medium text-text-primary"
                @click="closeMobile"
              >
                {{ t('common.products') }}
              </RouterLink>
              <ul v-if="item.children" class="m-0 mt-2 list-none space-y-2 border-l-2 border-surface-border p-0 pl-3">
                <li v-for="cat in item.children" :key="cat.key">
                  <RouterLink :to="cat.href" class="text-sm text-text-secondary" @click.prevent="goTopCategory(cat.href)">
                    {{ t(`menu.${cat.key}`) }}
                  </RouterLink>
                  <ul v-if="cat.children?.length" class="m-0 mt-1 list-none space-y-1 p-0 pl-2">
                    <li v-for="sub in cat.children" :key="sub.key">
                      <RouterLink :to="sub.href" class="text-xs text-text-secondary">{{ t(`menu.${sub.key}`) }}</RouterLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </template>
            <a
              v-else
              :href="item.href"
              class="block text-text-primary"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
              @click="closeMobile"
            >
              {{ t(`common.${item.key}`) }}
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Search overlay -->
    <Teleport to="body">
      <div
        v-show="searchOpen"
        class="fixed inset-0 z-[200] flex items-start justify-center bg-black/40 p-4 pt-24"
        role="dialog"
        aria-modal="true"
        :aria-label="t('common.searchSite')"
        @click.self="searchOpen = false"
      >
        <div class="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
          <button
            type="button"
            class="absolute right-3 top-3 text-2xl leading-none text-text-secondary hover:text-text-primary"
            :aria-label="t('header.closeSearch')"
            @click="searchOpen = false"
          >
            ×
          </button>
          <h2 class="mb-4 text-lg font-semibold text-text-primary">{{ t('common.searchSite') }}</h2>
          <form class="flex gap-2" @submit.prevent="submitSearch">
            <label class="sr-only" for="site-search">{{ t('common.search') }}</label>
            <input
              id="site-search"
              type="search"
              v-model="searchKeyword"
              :placeholder="t('common.searchPlaceholder')"
              class="min-w-0 flex-1 appearance-none rounded border border-[#9b9b9b] bg-white px-3 py-2 text-sm outline-none ring-0"
            />
            <button type="submit" class="rounded bg-text-primary px-4 py-2 text-sm text-white">{{ t('common.search') }}</button>
          </form>
        </div>
      </div>
    </Teleport>
  </header>
</template>
