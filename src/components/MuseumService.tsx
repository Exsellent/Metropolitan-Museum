interface IApiResponse {
  primaryImageSmall: string;
  artistDisplayName: string;
  culture: string;
  period: string;
  accessionYear: string;
}

interface IWeatherInfo {
  primaryImageSmall: string;
  artistDisplayName: string;
  culture: string;
  period: string;
  accessionYear: string;
}

class MuseumService {
  getInfo = async (info = "4567"): Promise<IWeatherInfo> => {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${info}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch, status: ${res.status}`);
    }
    const resource: IApiResponse = await res.json();
    return this._transformCharacter(resource);
  };

  private _transformCharacter = (res: IApiResponse): IWeatherInfo => {
    return {
      primaryImageSmall: res.primaryImageSmall,
      artistDisplayName: res.artistDisplayName,
      culture: res.culture,
      period: res.period,
      accessionYear: res.accessionYear,
    };
  };
}

export default MuseumService;
