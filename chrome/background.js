let searchInaraContextMenu = {
  "id": "inara",
  "title": "Search %s on Inara",
  "contexts": ["selection"],
};

let searchEDSMContextMenu = {
  "id": "edsm",
  "title": "Search %s on EDSM",
  "contexts": ["selection"],
};

chrome.contextMenus.create(searchInaraContextMenu);
chrome.contextMenus.create(searchEDSMContextMenu);

chrome.contextMenus.onClicked.addListener(((info) => {
  const query = info.selectionText;
  const url = generateInaraUrl(query);
  chrome.tabs.create({url: url});
}))

function generateInaraUrl(query) {
  const url = 'https://inara.cz/elite/search/?search=';

  return `${url}${encodeURIComponent(query)}`;
}
