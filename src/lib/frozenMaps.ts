const frozenBasePath = "/frozen";

export const portalFrozenMap: Record<string, string> = {};

export function toFrozenSrc(path: string): string {
  if (!path) {
    return frozenBasePath;
  }

  if (/^https?:\/\//i.test(path) || path.startsWith("/")) {
    return path;
  }

  return `${frozenBasePath}/${path}`;
}