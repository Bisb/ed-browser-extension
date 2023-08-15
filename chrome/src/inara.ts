export function generateInaraUrl(query: string) {
  const url = 'https://inara.cz/elite/search/?search=';

  return `${url}${encodeURIComponent(query)}`;
}
