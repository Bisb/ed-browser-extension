import { generateInaraUrl } from '../inara';
import { generateEDSMUrlOrSearchSystemUrl } from '../edsm';

const getSelectedText = async () => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  let result = undefined;
  try {
    if (tab.id) {
      [{result}] = await chrome.scripting.executeScript({
        target: {tabId: tab.id}, func: () => getSelection()?.toString(),
      });
    }
  } catch (e) {
    return;
  }
  return result;
};

chrome.commands.onCommand.addListener(async command => {
  const selection = await getSelectedText();

  if (selection) {
    switch (command) {
      case 'open-inara':
        chrome.tabs.create({url: generateInaraUrl(selection)});
        break;
      case 'open-edsm':
        const url = await generateEDSMUrlOrSearchSystemUrl(selection)
        chrome.tabs.create({url: url});
        break;
    }
  }
});
