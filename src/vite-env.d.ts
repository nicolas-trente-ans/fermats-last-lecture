/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string
  readonly VITE_YOUTUBE_VIDEO_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
