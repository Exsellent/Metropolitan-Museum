import React, { Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";

const MuseumView = lazy(() => import("./MuseumView"));
const NotFoundPage = lazy(() => import("./NotFoundPage"));
const FavoritesPage = lazy(() => import("./FavoritesPage"));
const SearchPage = lazy(() => import("./SearchPage"));
const LoginPage = lazy(() => import("./LoginPage"));

const CustomNavigator = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Museum View</Link>
        </li>
        <li>
          <Link to="/search">Search Page</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites Page</Link>
        </li>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
      </ul>
    </nav>
  );
};

const Routing = () => {
  return (
    <Suspense
      fallback={<LoadingOverlay visible={true} overlayOpacity={0} zIndex={0} />}
    >
      <CustomNavigator />
      <Routes>
        <Route path="/" element={<MuseumView />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;
