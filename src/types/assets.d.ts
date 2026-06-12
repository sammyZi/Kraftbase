/**
 * Ambient module declarations for static image assets.
 *
 * Lets TypeScript resolve `import logo from './logo.png'` style imports used for
 * bundled illustrations. The runtime value is the numeric asset reference that
 * React Native's `Image` `source` prop accepts (Metro replaces the import with
 * the registered asset id).
 */

declare module '*.png' {
  const content: number;
  export default content;
}

declare module '*.jpg' {
  const content: number;
  export default content;
}

declare module '*.jpeg' {
  const content: number;
  export default content;
}

declare module '*.gif' {
  const content: number;
  export default content;
}

declare module '*.svg' {
  const content: number;
  export default content;
}
