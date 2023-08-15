interface Options {
  defaultSearchEngine?: string;
  contextMenus?: {
    inara?: boolean;
    edsmSystem?: boolean;
    edsmStation?: boolean;
    edsmBodies?: boolean;
    edsmFactions?: boolean;
  }
}

const defaultOptions = {
  defaultSearchEngine: 'inara',
  contextMenus: {
    inara: true,
    edsmSystem: true,
    edsmBodies: false,
    edsmFactions: false,
    edsmStation: false,
  },
} as Options

const saveOptions = () => {
  chrome.storage.sync.set({})
}

const onSubmit = (ev: SubmitEvent) => {
  ev.preventDefault();
  const inputNames = [
    'default_search',
    'contextMenus[inara]',
    'contextMenus[edsm_system]',
  ];

  const getInputValue = (name: string) => {
    return (Array.from(document.getElementsByName(name)) as Array<HTMLInputElement>)
      .find(radio => radio.checked)?.value
  };

  const options: Options = {
    defaultSearchEngine: getInputValue('default_search'),
  };
  console.log({...defaultOptions, ...options});
}

(document.querySelector('form') as HTMLFormElement)
  .addEventListener('submit', onSubmit)


document.addEventListener('DOMContentLoaded', ev => {
  console.log(ev);
  chrome.runtime.sendMessage({test: 'test'});
})
