import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import ApiContext from "../ApiContext/ApiContext";
import { IArtwork } from "features/types";
import useDebounce from "../hooks/useDebounce";
import { fetchMuseumObjects } from "./api";
import { saveToLocalStorage, getFromLocalStorage } from "services/localStorage";

interface ISearchFormInputs {
  keyword: string;
}

const SearchPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const apiContext = React.useContext(ApiContext);
  const { register, handleSubmit } = useForm<ISearchFormInputs>();

  const debounceDelay = 500;
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IArtwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getSearchHistoryFromLocalStorage = (): IArtwork[] => {
    return getFromLocalStorage<IArtwork[]>("searchResults") || [];
  };

  const searchHistory = getSearchHistoryFromLocalStorage();

  const handleSearch = async (keyword: string) => {
    setLoading(true);
    setError("");
    try {
      const objectIDs = await fetchMuseumObjects(keyword);
      // Convert objectIDs to an array of IArtwork with placeholder data
      const results: IArtwork[] = objectIDs.map((id) => ({
        id: id.toString(),
        name: `Artwork ${id}`,
        email: "example@example.com",
      }));
      setSearchResults(results);
    } catch (error) {
      setError("An error occurred while fetching search results");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearchKeyword = useDebounce(searchKeyword, debounceDelay);

  const saveSearchResultsToLocalStorage = (results: IArtwork[]) => {
    saveToLocalStorage("searchResults", results);
  };

  useEffect(() => {
    // Handle search when debounced search keyword changes
    if (debouncedSearchKeyword.trim() !== "") {
      handleSearch(debouncedSearchKeyword);
    }

    // Save search results to localStorage when searchResults state updates
    if (searchResults.length > 0) {
      saveSearchResultsToLocalStorage(searchResults);
    }
  }, [debouncedSearchKeyword, searchResults]);

  const onSubmit = (data: ISearchFormInputs) => {
    setSearchKeyword(data.keyword);
  };

  const handleAddArtwork = () => {
    if (loggedIn && apiContext) {
      const artwork: IArtwork = {
        id: "1",
        name: "Artwork 1",
        email: "example@example.com",
      };
      apiContext.addArtwork(artwork);
    }
  };

  return (
    <div>
      <h1>Search Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("keyword")} />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {searchResults.map((artwork) => (
          <li key={artwork.id}>{artwork.name}</li>
        ))}
      </ul>
      <button onClick={handleAddArtwork}>Add Artwork</button>
      {/* Display the list of search history */}
      <h2>Search History</h2>
      <ul>
        {searchHistory.map((artwork) => (
          <li key={artwork.id}>{artwork.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
