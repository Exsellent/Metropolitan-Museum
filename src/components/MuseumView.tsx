import React, { useState, useEffect, useCallback } from "react";
import { Form, Button } from "react-bootstrap";
import { fetchMuseumObjects } from "./api";
import PropTypes from "prop-types";

interface IMuseumObject {
  objectID: number;
  title: string;
  artistDisplayName: string;
}

const MuseumView: React.FC = () => {
  const [museumObjects, setMuseumObjects] = useState<IMuseumObject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const fetchMuseumObjectsList = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const objectIDs = await fetchMuseumObjects(searchKeyword);
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
  }, [searchKeyword]);

  useEffect(() => {
    fetchMuseumObjectsList();
  }, [fetchMuseumObjectsList]);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchMuseumObjectsList();
  };

  const museumObjectList = museumObjects.map((object) => (
    <li key={object.objectID}>
      {object.title} - {object.artistDisplayName}
    </li>
  ));

  return (
    <>
      <Form onSubmit={handleSearch}>
        <Form.Label>Keyword Search:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a keyword"
          value={searchKeyword}
          onChange={handleUserInput}
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>{museumObjectList}</ul>
    </>
  );
};

MuseumView.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default MuseumView;
