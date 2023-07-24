import React, { useState, useEffect } from "react";
import { Form, Button, Image, Table } from "react-bootstrap";
import { fetchMuseumObjects, fetchMuseumInfo } from "./api";

interface IMuseumArtwork {
  objectID: number;
  title: string;
  artistDisplayName: string;
}

interface IApiResponse {
  primaryImageSmall: string;
  artistDisplayName: string;
  culture: string;
  period: string;
  accessionYear: string;
}

const convertToMuseumArtwork = (data: IApiResponse[]): IMuseumArtwork[] => {
  return data.map((item) => ({
    objectID: Math.floor(Math.random() * 10000), // Just a placeholder objectID since the API doesn't provide it
    title: item.artistDisplayName,
    artistDisplayName: item.artistDisplayName,
  }));
};

const MuseumText: React.FC = () => {
  const [response, setResponse] = useState<IApiResponse | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [museumObjects, setMuseumObjects] = useState<IMuseumArtwork[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchMuseumObjectsByKeyword("cats");
  }, []);

  const handleApiResponse = async (id: number) => {
    try {
      const museumInfo = await fetchMuseumInfo(id);
      setResponse(museumInfo);
      setError("");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const fetchMuseumObjectsByKeyword = async (keyword: string) => {
    try {
      const objectIDs = await fetchMuseumObjects(keyword);
      const museumObjects = await Promise.all(
        objectIDs.map((id) => fetchMuseumInfo(id))
      );
      setMuseumObjects(convertToMuseumArtwork(museumObjects));
      setError("");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
  };

  const submitUserInput = (e: React.FormEvent) => {
    e.preventDefault();
    handleApiResponse(parseInt(searchKeyword, 10));
  };

  const {
    primaryImageSmall,
    artistDisplayName,
    culture,
    period,
    accessionYear,
  } = response || {};

  const museumObjectList = museumObjects.map(
    ({ objectID, title, artistDisplayName }) => (
      <li key={objectID}>
        {title}: {artistDisplayName}
      </li>
    )
  );

  return (
    <>
      <Form onSubmit={submitUserInput}>
        <Form.Label>Search Keyword:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a keyword"
          value={searchKeyword}
          onChange={handleUserInput}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {error && <p>{error}</p>}

      {response && (
        <div>
          <Image src={primaryImageSmall} alt="Artwork" />
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name:</th>
                <th>Culture:</th>
                <th>Period:</th>
                <th>Accession Year:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{artistDisplayName}</td>
                <td>{culture}</td>
                <td>{period}</td>
                <td>{accessionYear}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}

      <ul>{museumObjectList}</ul>
    </>
  );
};

export default MuseumText;
