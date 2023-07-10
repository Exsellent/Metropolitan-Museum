import axios from "axios";

const API_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

interface IApiResponse {
  primaryImageSmall: string;
  artistDisplayName: string;
  culture: string;
  period: string;
  accessionYear: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IMuseumArtwork {
  objectID: number;
  title: string;
  artistDisplayName: string;
}

export const fetchMuseumObjects = async (keyword: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?q=${keyword}`);
    const objectIDs: number[] = response.data.objectIDs;
    return objectIDs;
  } catch (error) {
    throw new Error("Failed to fetch museum objects");
  }
};

export const fetchMuseumInfo = async (id: number): Promise<IApiResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/objects/${id}`);
    const museumInfo: IApiResponse = response.data;
    return museumInfo;
  } catch (error) {
    throw new Error("Failed to fetch museum info");
  }
};
