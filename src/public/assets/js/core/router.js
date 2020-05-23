export function navigate(page) {
  window.location = `#${page}`;
}

export function getCurrentLocation() {
  return window.location.hash.slice(1).split(':')[0];
}
