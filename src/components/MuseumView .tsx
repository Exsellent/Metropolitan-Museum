import React, { useState, useEffect } from "react";
import { Table, Form, Button, Image } from "react-bootstrap";
import { fetchMuseumObjects, fetchMuseumInfo } from "./api";

// Интерфейс для музейного объекта
interface IMuseumArtwork {
  objectID: number; // уникальный идентификатор объекта
  title: string; // название объекта
  artistDisplayName: string; // имя художника
}

// Интерфейс для ответа API
interface IApiResponse {
  primaryImageSmall: string; // ссылка на изображение объекта
  artistDisplayName: string; // имя художника
  culture: string; // культура, к которой относится объект
  period: string; // период, в котором был создан объект
  accessionYear: string; // год поступления объекта в музей
}

// Компонент для отображения музейных объектов
const MuseumView: React.FC = () => {
  const [response, setResponse] = useState<IApiResponse | null>(null);
  const [field, setField] = useState<string>("");
  const [museumObjects, setMuseumObjects] = useState<IMuseumArtwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchMuseumObjectsByKeyword("cats");
  }, []);

  const fetchMuseumObjectsByKeyword = async (keyword: string) => {
    setLoading(true);
    setError("");
    try {
      const objectIDs = await fetchMuseumObjects(keyword);
      const promises = objectIDs.map((id) => fetchMuseumInfo(id));
      const results = await Promise.all(promises);
      const objects = results.map(
        (result) => result as unknown as IMuseumArtwork
      );
      setMuseumObjects(objects);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateMuseumInfo = async (info: string) => {
    setResponse(null);
    setLoading(true);
    setError("");
    try {
      const response = await fetchMuseumInfo(+info);
      setResponse(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setField(name);
    updateMuseumInfo(name);
  };

  const submitUserInput = () => {
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
        <Form.Label>Поиск по ключевому слову:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите ключевое слово"
          onChange={handleUserInput}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {response && (
        <div>
          <Image src={primaryImageSmall} alt="Произведение искусства" />
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Имя:</th>
                <th>Культура:</th>
                <th>Период:</th>
                <th>Год поступления:</th>
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
