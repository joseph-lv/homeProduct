/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** POST endpoint for the contact form, e.g. https://your-server.com/api/contact */
  readonly VITE_CONTACT_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
