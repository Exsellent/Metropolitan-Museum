import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";

const MuseumView = lazy(() => import("./MuseumView"));
const NotFoundPage = lazy(() => import("./NotFoundPage"));
const FavoritesPage = lazy(() => import("../components/FavoritesPage"));
const SearchPage = lazy(() => import("../components/SearchPage"));
const LoginPage = lazy(() => import("../components/LoginPage"));

const Routing = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <LoadingOverlay visible={true} overlayOpacity={0} zIndex={0} />
        }
      >
        <Routes>
          <Route path="/" element={<MuseumView />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default Routing;
