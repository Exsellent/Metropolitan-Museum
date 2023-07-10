import React, { useState, useEffect, useMemo } from "react";
import { Table, Form, Button, Image } from "react-bootstrap";
import axios from "axios";
import MuseumService from "./MuseumService";

interface IMuseumObject {
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

  useEffect(() => {
    fetchMuseumObjects("cats");
  }, []);

  const fetchMuseumObjects = (keyword: string) => {
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
              setMuseumObjects((prevObjects) => [
                ...prevObjects,
                response.data,
              ]);
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

  const museumService = useMemo(() => new MuseumService(), []);

  const updateMuseumInfo = (info: string) => {
    // eslint-disable-next-line no-console
    console.log(info);
    setResponse(null);
    museumService.getInfo(info).then(onMuseumInfoLoaded);
  };

  const onMuseumInfoLoaded = (response: IApiResponse) => {
    setResponse(response);
    setField("");
    // eslint-disable-next-line no-console
    console.log(response);
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
