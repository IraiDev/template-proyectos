/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OUTDIR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
