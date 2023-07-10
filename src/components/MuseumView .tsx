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
const MuseumView = () => {
  const [response, setResponse] = useState<IApiResponse | null>(null); // состояние для хранения ответа API по выбранному объекту
  const [field, setField] = useState(""); // состояние для хранения значения поля ввода
  const [museumObjects, setMuseumObjects] = useState<IMuseumArtwork[]>([]); // состояние для хранения массива музейных объектов по заданному ключевому слову
  const [loading, setLoading] = useState(false); // состояние для индикации загрузки данных
  const [error, setError] = useState(""); // состояние для хранения сообщения об ошибке

  useEffect(() => {
    fetchMuseumObjectsByKeyword("cats"); // при монтировании компонента запрашиваем музейные объекты по ключевому слову "cats"
  }, []);

  // Функция для получения музейных объектов по заданному ключевому слову и обновления состояния
  const fetchMuseumObjectsByKeyword = async (keyword: string) => {
    setLoading(true); // начинаем загрузку данных
    setError(""); // сбрасываем ошибку
    try {
      const objectIDs = await fetchMuseumObjects(keyword); // получаем массив id объектов по ключевому слову с помощью функции из файла api.tsx
      const promises = objectIDs.map((id) => fetchMuseumInfo(id)); // создаем массив промисов для каждого id с помощью функции из файла api.tsx
      const results = await Promise.all(promises); // дожидаемся выполнения всех промисов и получаем массив результатов типа IApiResponse[]
      const objects = results.map(
        (result) => result as unknown as IMuseumArtwork
      ); // приводим типы результатов к типу IMuseumArtwork[]
      setMuseumObjects(objects); // сохраняем массив объектов в состояние
    } catch (err: Error) {
      // ловим возможную ошибку и сохраняем ее сообщение в состояние
      setError(err.message);
    } finally {
      // в любом случае завершаем загрузку данных
      setLoading(false);
    }
  };

  // Функция для получения информации о выбранном музейном объекте по его id и обновления состояния
  const updateMuseumInfo = async (info: string) => {
    // eslint-disable-next-line no-console
    console.log(info); // выводим в консоль значение аргумента info (id объекта)
    setResponse(null); // сбрасываем предыдущий ответ API
    setLoading(true); // начинаем загрузку данных
    setError(""); // сбрасываем ошибку
    try {
      const response = await fetchMuseumInfo(+info); // получаем информацию об объекте по его id с помощью функции из файла api.tsx (преобразуем строку в число)
      setResponse(response); // сохраняем ответ API в состояние
    } catch (err: Error) {
      // ловим возможную ошибку и сохраняем ее сообщение в состояние
      setError(err.message);
    } finally {
      // в любом случае завершаем загрузку данных
      setLoading(false);
    }
  };

  // Функция для обработки пользовательского ввода и обновления состояния
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value; // получаем значение из поля ввода
    setField(name); // сохраняем его в состояние
    updateMuseumInfo(name); // запрашиваем информацию об объекте по его id
  };

  // Функция для отправки пользовательского ввода и обновления состояния
  const submitUserInput = () => {
    updateMuseumInfo(field); // запрашиваем информацию об объекте по его id, который хранится в состоянии
  };

  // Деструктурируем свойства из ответа API или пустого объекта, если ответа нет
  const {
    primaryImageSmall,
    artistDisplayName,
    culture,
    period,
    accessionYear,
  } = response || {};

  // Создаем список музейных объектов из массива, который хранится в состоянии
  const museumObjectList = museumObjects.map(
    ({ objectID, title, artistDisplayName }) => (
      <li key={objectID}>
        {title}: {artistDisplayName}
      </li>
    )
  );

  // Возвращаем JSX-разметку для отображения компонента
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
      {loading && <p>Loading...</p>} /{error && <p>{error}</p>}
      {response && ( // показываем информацию о выбранном объекте, если ответ API есть
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
