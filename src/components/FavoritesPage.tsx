import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFavorites, removeFavorite } from "../features/favoritesSlice";

const FavoritesPage: React.FC = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (favoriteId: string) => {
    dispatch(removeFavorite(favoriteId));
  };

  return (
    <div>
      <h1>Favorites Page</h1>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            {favorite.id}{" "}
            <button onClick={() => handleRemoveFavorite(favorite.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
