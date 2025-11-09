// Polyfill for Buffer (needed for some dependencies)
import { Buffer } from 'buffer'

// Make Buffer available globally before any other code runs
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
  globalThis.Buffer = Buffer
}

// Also set it on global for Node.js-like environments
if (typeof global !== 'undefined') {
  // @ts-ignore
  global.Buffer = Buffer
}

export {}

