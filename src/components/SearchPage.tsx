import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import ApiContext from "../ApiContext/ApiContext";
import { IArtwork } from "features/types";
import useDebounce from "../hooks/useDebounce"; // Import the useDebounce hook

interface ISearchFormInputs {
  keyword: string;
}

const SearchPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const apiContext = React.useContext(ApiContext);
  const { register, handleSubmit } = useForm<ISearchFormInputs>();

  // Define the debounce delay (e.g., 500ms)
  const debounceDelay = 500;
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");

  // Use the useDebounce hook to create the debounced version of searchKeyword
  const debouncedSearchKeyword = useDebounce(searchKeyword, debounceDelay);

  const handleSearch = (data: ISearchFormInputs) => {
    const { keyword } = data;
    // eslint-disable-next-line no-console
    console.log("Searching for:", keyword);
    // Perform your search logic here
  };

  useEffect(() => {
    handleSearch({ keyword: debouncedSearchKeyword });
  }, [debouncedSearchKeyword]);

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
      <button onClick={handleAddArtwork}>Add Artwork</button>
    </div>
  );
};

export default SearchPage;
