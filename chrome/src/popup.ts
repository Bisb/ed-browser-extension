let submitInaraElem = document.querySelector('#js-submit-inara');
if (submitInaraElem) {
  submitInaraElem.addEventListener('click', searchInara);
}

function searchInara() {
  const url = 'https://inara.cz/elite/search/?search=';
  let queryElem = document.querySelector('#query') as HTMLInputElement;
  if (queryElem) {
    const query = queryElem.value;
    chrome.tabs.create({url: `${url}${encodeURIComponent(query)}`});
  }
}
