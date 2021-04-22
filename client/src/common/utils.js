export function get(obj, path, defaultVal = null) {
  if (typeof path === 'string') {
    path = path.split('.');
  }
  if (!obj) return defaultVal;
  let i;
  for (i = 0; i < path.length; i++) {
    obj = obj[path[i]];
    if (!obj) break;
  }
  if (i === path.length) {
    if (obj === undefined) {
      return defaultVal;
    }
    return obj;
  }
  return defaultVal;
}

export const to = (promise) => promise.then((data) => [null, data]).catch((err) => [err, null]);
