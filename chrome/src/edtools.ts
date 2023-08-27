const inputNames = ['s', 'ref_sys'];

const onFormSubmit = (ev: SubmitEvent) => {
  const form = ev.target as HTMLFormElement;
  const formData = new FormData(form);

  for (const entry of formData.entries()) {
    const key = entry[0];
    const value = entry[1];

    if (inputNames.includes(key)) {
      chrome.storage.local.set({edtoolsSystem: value});
    }
  }
}

const onFormLoaded = async (formElement: HTMLFormElement) => {
  const loadedSystem = await chrome.storage.local.get(['edtoolsSystem'])

  if (loadedSystem) {
    for (const inputName of inputNames) {
      let selectors = `input[name="${inputName}"], input#${inputName}`;
      let inputElement: HTMLInputElement | null = formElement.querySelector(selectors);
      if (inputElement) {
        inputElement.value = decodeURIComponent(loadedSystem.edtoolsSystem);
      }
    }
  }
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    let formElement = document.querySelector('form');
    if (formElement) {
      onFormLoaded(formElement);
      formElement.addEventListener('submit', onFormSubmit);
    }
  }
}
