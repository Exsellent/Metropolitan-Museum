import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Image, Table } from "react-bootstrap";
import { fetchMuseumObjects, fetchMuseumInfo } from "./api";
import PropTypes from "prop-types";
interface IMuseumObject {
  objectID: number;
  title: string;
  artistDisplayName: string;
}

interface IApiResponse {
  artistDisplayName: React.ReactNode;
  primaryImageSmall: string;
  accessionYear: React.ReactNode;
  culture: React.ReactNode;
  period: React.ReactNode;
}

const MuseumView: React.FC = () => {
  const [response, setResponse] = useState<IApiResponse | null>(null);
  const [museumObjects, setMuseumObjects] = useState<IMuseumObject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchMuseumObjectsList = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const keyword = "art"; // Placeholder for user input or any keyword you want to use
      const objectIDs = await fetchMuseumObjects(keyword);
      // Convert objectIDs to an array of IMuseumObject with placeholder data
      const objects: IMuseumObject[] = objectIDs.map((id) => ({
        objectID: id,
        title: `Artwork ${id}`,
        artistDisplayName: "Artist Name",
      }));
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
  }, []);

  useEffect(() => {
    fetchMuseumObjectsList();
  }, [fetchMuseumObjectsList]);

  const handleUserInput = async () => {
    // Handle user input here
  };

  const updateMuseumInfo = async () => {
    setResponse(null);
    setLoading(true);
    setError("");
    try {
      const [firstObject] = museumObjects;
      if (firstObject) {
        const artworkData = await fetchMuseumInfo(firstObject.objectID);
        setResponse(artworkData);
      }
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

  const handleAddArtwork = () => {};

  const museumObjectList = museumObjects.map((object) => (
    <li key={object.objectID}>
      {object.title} - {object.artistDisplayName}
    </li>
  ));

  return (
    <>
      <Form>
        <Form.Label>Keyword Search:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a keyword"
          onChange={handleUserInput}
        />
        <Button variant="primary" onClick={updateMuseumInfo}>
          Submit
        </Button>
      </Form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {response && (
        <div>
          <Image src={response.primaryImageSmall} alt="Artwork" />
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
                <td>{response.artistDisplayName}</td>
                <td>{response.culture}</td>
                <td>{response.period}</td>
                <td>{response.accessionYear}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
      <ul>{museumObjectList}</ul>
      <Button onClick={handleAddArtwork}>Add Artwork</Button>
    </>
  );
};

MuseumView.propTypes = {
  title: PropTypes.string,
};

export default MuseumView;
