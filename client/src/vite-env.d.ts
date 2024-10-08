/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_ENDPOINT: string; // Declare your environment variable here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  