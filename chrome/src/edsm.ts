export interface System {
  id: number;
  name: string;
}

export function findEDSMSystem(systemName: string): Promise<System> {
  const endpoint = 'https://www.edsm.net/api-v1/systems?showId=1&systemName=';
  let url = `${endpoint}${encodeURIComponent(systemName)}`;

  return new Promise<System>((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then((systems: Array<System>) => {
        if (systems.length) {
          resolve(systems[0]);
        } else {
          reject();
        }
      });
  })
}

export function generateEDSMSearchSystemUrl(systemName: string): string {
  return `https://www.edsm.net/en/search/systems/index/name/${systemName}`;
}

export function generateEDSMUrl(systemId: number, systemName: string): string {
  return `https://www.edsm.net/en/system/id/${systemId}/name/${encodeURIComponent(systemName)}`;
}

export function generateEDSMUrlOrSearchSystemUrl(query: string): Promise<string> {
  return new Promise<string>(resolve => {
    findEDSMSystem(query)
      .then(system => {
        const url = generateEDSMUrl(system.id, system.name);
        resolve(url);
      })
      .catch(() => {
        const url = generateEDSMSearchSystemUrl(query);
        resolve(url);
      })
  });
}
