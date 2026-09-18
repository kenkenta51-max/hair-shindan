/** Resolve bundled public assets under the configured hosting path. */
export function assetUrl(path: string): string {
  return path.startsWith('/') && !path.startsWith('//')
    ? `${import.meta.env.BASE_URL}${path.slice(1)}`
    : path;
}
