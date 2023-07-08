import React, { useState, useEffect } from "react";
import { Table, Form, Button, Image } from "react-bootstrap";
import axios from "axios";
import WeatherService from "../WeatherService";

interface IObject {
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

const View = () => {
  const [res, setRes] = useState<IApiResponse | null>(null);
  const [field, setField] = useState("");
  const [objects, setObjects] = useState<IObject[]>([]);

  useEffect(() => {
    fetchObjects("cats");
  }, []);

  const fetchObjects = (keyword: string) => {
    axios
      .get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`
      )
      .then((response) => {
        const objectIDs: number[] = response.data.objectIDs;
        objectIDs.forEach((id) => {
          axios
            .get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            )
            .then((response) => {
              setObjects((prevObjects) => [...prevObjects, response.data]);
            })
            .catch((error) => {
              console.error(error);
            });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const weatherService = new WeatherService();

  const updateInfo = (info: string) => {
    // eslint-disable-next-line no-console
    console.log(info);
    setRes(null);
    weatherService.getInfo(info).then(onInfoLoaded);
    // eslint-disable-next-line no-console
    console.log(res);
  };

  const onInfoLoaded = (res: IApiResponse) => {
    setRes(res);
    setField("");
    // eslint-disable-next-line no-console
    console.log(res);
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setField(name);
    // eslint-disable-next-line no-console
    console.log(name);
    updateInfo(name);
  };

  const submitUserInput = () => {
    // eslint-disable-next-line no-console
    console.log(field);
    updateInfo(field);
  };

  const {
    primaryImageSmall,
    artistDisplayName,
    culture,
    period,
    accessionYear,
  } = res || {};

  const objectList = objects.map(({ objectID, title, artistDisplayName }) => (
    <li key={objectID}>
      {title}: {artistDisplayName}
    </li>
  ));

  return (
    <>
      <Form onSubmit={submitUserInput}>
        <Form.Label>Student Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter student name"
          onChange={handleUserInput}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {res && (
        <div>
          <Image src={primaryImageSmall} alt="Random Character" />
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name:</th>
                <th>Culture:</th>
                <th>Period:</th>
                <th>Year:</th>
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

      <ul>{objectList}</ul>
    </>
  );
};

export default View;
