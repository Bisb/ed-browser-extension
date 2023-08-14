export function generateInaraUrl(query) {
  const url = 'https://inara.cz/elite/search/?search=';

  return `${url}${encodeURIComponent(query)}`;
}
