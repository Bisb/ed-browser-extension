import { findEDSMSystem, generateEDSMSearchSystemUrl, generateEDSMUrl } from './edsm';
import CreateProperties = chrome.contextMenus.CreateProperties;
import './scripts/commands';

const initContextMenus = () => {
  const searchInaraContextMenu = {
    id: 'inara',
    title: 'Search "%s" on Inara',
    contexts: ['selection'],
  } as CreateProperties;

  const searchEDSMContextMenu = {
    id: 'edsm',
    title: 'Search "%s" on EDSM',
    contexts: ['selection'],
  } as CreateProperties;

  chrome.contextMenus.create(searchInaraContextMenu);
  chrome.contextMenus.create(searchEDSMContextMenu);

  chrome.contextMenus.onClicked.addListener((info) => {
    const query: string = info.selectionText!.trim();

    if (info.menuItemId === 'edsm') {
      findEDSMSystem(query)
        .then(system => {
          const url = generateEDSMUrl(system.id, system.name);
          chrome.tabs.create({url: url});
        })
        .catch(() => {
          const url = generateEDSMSearchSystemUrl(query);
          chrome.tabs.create({url: url});
        })
    }
  });
}

initContextMenus();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, sender, sendResponse);
})

