export function isKeyOf<T extends object>(
  obj: T,
  key?: unknown,
): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key as PropertyKey)
}
