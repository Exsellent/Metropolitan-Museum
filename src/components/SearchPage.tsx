import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import ApiContext from "../ApiContext/ApiContext";
import { IArtwork } from "features/types";

interface ISearchFormInputs {
  keyword: string;
}

const SearchPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const apiContext = React.useContext(ApiContext);
  const { register, handleSubmit } = useForm<ISearchFormInputs>();

  const handleSearch = (data: ISearchFormInputs) => {
    const { keyword } = data;
    // eslint-disable-next-line no-console
    console.log("Searching for:", keyword);
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
      <form onSubmit={handleSubmit(handleSearch)}>
        <input type="text" {...register("keyword")} />
        <button type="submit">Search</button>
      </form>
      <button onClick={handleAddArtwork}>Add Artwork</button>
    </div>
  );
};

export default SearchPage;
