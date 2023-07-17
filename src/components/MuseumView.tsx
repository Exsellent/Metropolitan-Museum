import React, { useState, useEffect, useContext, useCallback } from "react";
import { Form, Button, Image, Table } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import ApiContext from "../ApiContext/ApiContext";
import { IArtwork } from "features/types";
import { IApiResponse, fetchMuseumObjects, fetchMuseumInfo } from "./api";
import "./museum-view.css";

const MuseumView: React.FC = () => {
  const { loggedIn } = useAuth();
  const apiContext = useContext(ApiContext);
  const [response, setResponse] = useState<IApiResponse | null>(null);
  const [museumObjects, setMuseumObjects] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchMuseumObjectsList = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const keyword = "cats"; // Replace with user input or any keyword you want to use
      const objectIDs = await fetchMuseumObjects(keyword);
      setMuseumObjects(objectIDs);
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
    setLoading(true);
    setError("");
    try {
      const keyword = "cats"; // Replace with user input or any keyword you want to use
      const objectIDs = await fetchMuseumObjects(keyword);
      setMuseumObjects(objectIDs);
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

  const updateMuseumInfo = async () => {
    setResponse(null);
    setLoading(true);
    setError("");
    try {
      const [firstObjectID] = museumObjects;
      if (firstObjectID) {
        const museumInfo = await fetchMuseumInfo(firstObjectID);
        setResponse(museumInfo);
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

  const handleAddArtwork = () => {
    if (loggedIn && apiContext) {
      const artwork: IArtwork = {
        id: "1",
        email: "example@example.com",
        name: "",
      };
      apiContext.addArtwork(artwork);
    }
  };

  const museumObjectList = museumObjects.map((objectID) => (
    <li key={objectID}>{objectID}</li>
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

export default MuseumView;
