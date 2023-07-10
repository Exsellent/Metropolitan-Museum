import React, { useState, useEffect } from "react";
import { Table, Form, Button, Image } from "react-bootstrap";
import { fetchMuseumObjects, fetchMuseumInfo } from "./api";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const MuseumView = () => {
  const [response, setResponse] = useState<IApiResponse | null>(null);
  const [field, setField] = useState("");
  const [museumObjects, setMuseumObjects] = useState<IMuseumObject[]>([]);
  const [loading, setLoading] = useState(false); // добавили состояние загрузки
  const [error, setError] = useState(""); /// добавили состояние ошибки

  useEffect(() => {
    fetchMuseumObjectsByKeyword("cats");
  }, []);

  const fetchMuseumObjectsByKeyword = async (keyword: string) => {
    setLoading(true); // начали загрузку
    setError(""); // сбросили ошибку
    try {
      const objectIDs = await fetchMuseumObjects(keyword); // получили массив id объектов
      const promises = objectIDs.map((id) => fetchMuseumInfo(id)); //создали массив промисов для каждого объекта id
      const results = await Promise.allSettled(promises); // получили результаты промиса
      const objects = results
        .filter((result) => result.status === "fulfilled") // отфильтровали успешные результаты
        .map(
          (result) => (result as PromiseFulfilledResult<IMuseumObject>).value
        ); // привели типы и получили массив объектов
      setMuseumObjects(objects); // сохраниили массив объектов
    } catch (err) {
      setError(err.message); // поймали ошибку и сохранили ее сообщение
    } finally {
      setLoading(false); // заканчили загрузку
    }
  };

  const updateMuseumInfo = async (info: string) => {
    // eslint-disable-next-line no-console
    console.log(info);
    setResponse(null);
    setLoading(true); // начали загрузку
    setError(""); // сбросили ошибку
    try {
      const response = await fetchMuseumInfo(info); // получили ошибку от API
      setResponse(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setField(name);
    // eslint-disable-next-line no-console
    console.log(name);
    updateMuseumInfo(name);
  };

  const submitUserInput = () => {
    // eslint-disable-next-line no-console
    console.log(field);
    updateMuseumInfo(field);
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

      {loading && <p>Loading...</p>}
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

export default MuseumView;
