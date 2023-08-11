document.querySelector('#js-submit-inara').addEventListener('click', searchInara);

function searchInara() {
  const url = 'https://inara.cz/elite/search/?search=';
  let query = document.querySelector('#query').value;
  chrome.tabs.create({url: `${url}${encodeURIComponent(query)}`});
}
