/// <reference types="vite/client" />
/// <reference types="react" />

// types for Vite env variables
interface ImportMetaEnv {
    readonly VITE_API_CLIENT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
