import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Table, Form, Button, Image } from "react-bootstrap";
import MuseumService from "./MuseumService";

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

const MuseumText = () => {
  const [res, setRes] = useState<IApiResponse | null>(null);
  const [field, setField] = useState("");
  const [objects, setObjects] = useState<IMuseumArtwork[]>([]);

  const museumService = useMemo(() => new MuseumService(), []);

  const fetchObjects = useCallback(
    async (keyword: string) => {
      try {
        const objectIDs = await museumService.getObjects(keyword);
        const objectData = await Promise.all(
          objectIDs.map((id) => museumService.getObjectInfo(id))
        );
        setObjects(objectData);
      } catch (error) {
        console.error(error);
      }
    },
    [museumService]
  );

  useEffect(() => {
    fetchObjects("cats");
  }, [fetchObjects]);

  const updateInfo = useCallback(
    (info: string) => {
      setRes(null);
      museumService.getInfo(info).then(onInfoLoaded);
    },
    [museumService, onInfoLoaded]
  );

  const onInfoLoaded = useCallback((res: IApiResponse) => {
    setRes(res);
    setField("");
  }, []);

  const handleUserInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value;
      setField(name);
      updateInfo(name);
    },
    [updateInfo]
  );

  const submitUserInput = useCallback(() => {
    updateInfo(field);
  }, [updateInfo, field]);

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

export default MuseumText;
