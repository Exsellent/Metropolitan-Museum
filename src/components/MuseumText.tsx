import React, { useState, useEffect } from "react";
import { Table, Form, Button, Image } from "react-bootstrap";
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

const MuseumText: React.FC = () => {
  const [response, setResponse] = useState<IApiResponse | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [museumObjects, setMuseumObjects] = useState<IMuseumArtwork[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchMuseumObjectsByKeyword("cats");
  }, []);
  // Вспомогательная функция для обработки ответа API и обновления состояния
  const handleApiResponse = async (id: number) => {
    try {
      const museumInfo = await fetchMuseumInfo(id);
      setResponse(museumInfo);
      setSearchKeyword("");
      setError("");
    } catch (error) {
      setError((error as Error).message);
    }
  };
  // Функция для выборки музейных объектов по заданному ключевому слову и обновления состояния
  const fetchMuseumObjectsByKeyword = async (keyword: string) => {
    try {
      const objectIDs = await fetchMuseumObjects(keyword);
      const museumObjects = await Promise.all(
        objectIDs.map((id) => fetchMuseumInfo(id))
      );
      setMuseumObjects(museumObjects as unknown as IMuseumArtwork[]);
      setError("");
    } catch (error) {
      setError((error as Error).message);
    }
  };
  // Функция для обработки пользовательского ввода и обновления состояния
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    handleApiResponse(parseInt(keyword, 10));
  };
  // Функция для отправки пользовательского ввода и обновления состояния
  const submitUserInput = () => {
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
