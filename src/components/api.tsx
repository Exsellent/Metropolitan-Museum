import axios from "axios";

const API_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export interface IApiResponse {
  objectIDs: number[];
  primaryImageSmall: string;
  artistDisplayName: string;
  culture: string;
  period: string;
  accessionYear: string;
}

export interface IMuseumArtwork {
  objectID: number;
  title: string;
  artistDisplayName: string;
}

export const fetchMuseumObjects = async (
  keyword: string
): Promise<number[]> => {
  try {
    const response = await axios.get<IApiResponse>(
      `${API_BASE_URL}/search?q=${keyword}`
    );
    const objectIDs: number[] = response.data.objectIDs;
    return objectIDs;
  } catch (error) {
    throw new Error("Failed to fetch museum objects");
  }
};

export const fetchMuseumInfo = async (id: number): Promise<IApiResponse> => {
  try {
    const response = await axios.get<IApiResponse>(
      `${API_BASE_URL}/objects/${id}`
    );
    const museumInfo: IApiResponse = response.data;
    return museumInfo;
  } catch (error) {
    throw new Error("Failed to fetch museum info");
  }
};
