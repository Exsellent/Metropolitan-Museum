import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Provider } from "react-redux";
import store from "redux/store";
import { AuthProvider, useAuth } from "hooks/useAuth";
import ApiContext from "ApiContext/ApiContext";
import ErrorBoundary from "ErrorBoundary/ErrorBoundary";
import MuseumView from "components/MuseumView";
import FavoritesPage from "components/FavoritesPage";
import SearchPage from "components/SearchPage";
import LoginPage from "components/LoginPage";
import NotFoundPage from "components/NotFoundPage";
import { IArtwork } from "features/artworksSlice";
import { IExhibition } from "features/exhibitionsSlice";
import { IFavorite } from "features/favoritesSlice";

import museumImage from "./assets/museum-image.jpg";
import metMuseumLogo from "./assets/met-museum-logo.png";
import "./assets/style.css";

interface IFormValues {
  username: string;
  password: string;
  fields?: { name: string; type: string; value: string }[];
}

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your username")
    .min(3, "Username must be at least 3 characters long"),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters long"),
});

const registrationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your username")
    .min(3, "Username must be at least 3 characters long"),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters long"),
});

interface IUserData {
  name: string;
  avatar: string;
  artworks: IArtwork[];
  exhibitions: IExhibition[];
  favorites: IFavorite[];
  addArtwork: (artwork: IArtwork) => void;
  removeArtwork: (id: string) => void;
}

const userData: IUserData = {
  name: "John Doe",
  avatar: "path/to/avatar.jpg",
  artworks: [],
  exhibitions: [],
  favorites: [],
  addArtwork: (artwork: IArtwork) => {
    userData.artworks.push(artwork);
  },
  removeArtwork: (id: string) => {
    userData.artworks = userData.artworks.filter((art) => art.id !== id);
  },
};

const App: React.FC = () => {
  const { loggedIn, handleLogin, handleLogout, handleRegistration } = useAuth();

  const handleLoginSubmit = async (values: IFormValues) => {
    const { username, password } = values;
    try {
      await handleLogin(username, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegistrationSubmit = async (values: IFormValues) => {
    const { username, password } = values;
    try {
      await handleRegistration(username, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <img src={metMuseumLogo} alt="Met Museum Logo" className="met-logo" />
          <h1>The Metropolitan Museum of Art Collection</h1>
        </div>
        <div className="content-wrapper">
          <img src={museumImage} alt="Museum" className="museum-image" />
          <div className="content-left">
            <div className="login-registration">
              {loggedIn ? (
                <>
                  <h2>Welcome, User!</h2>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Formik
                    initialValues={{
                      username: "",
                      password: "",
                      fields: [],
                    }}
                    validationSchema={loginSchema}
                    onSubmit={handleLoginSubmit}
                  >
                    {() => (
                      <Form>
                        <h1>Login</h1>
                        <div>
                          <label htmlFor="username">Username</label>
                          <Field type="text" id="username" name="username" />
                          <ErrorMessage name="username" component="div" />
                        </div>
                        <div>
                          <label htmlFor="password">Password</label>
                          <Field
                            type="password"
                            id="password"
                            name="password"
                          />
                          <ErrorMessage name="password" component="div" />
                        </div>
                        <button type="submit">Login</button>
                      </Form>
                    )}
                  </Formik>

                  <Formik
                    initialValues={{
                      username: "",
                      password: "",
                      fields: [],
                    }}
                    validationSchema={registrationSchema}
                    onSubmit={handleRegistrationSubmit}
                  >
                    {() => (
                      <Form>
                        <h1>Register</h1>
                        <div>
                          <label htmlFor="username">Username</label>
                          <Field type="text" id="username" name="username" />
                          <ErrorMessage name="username" component="div" />
                        </div>
                        <div>
                          <label htmlFor="password">Password</label>
                          <Field
                            type="password"
                            id="password"
                            name="password"
                          />
                          <ErrorMessage name="password" component="div" />
                        </div>
                        <button type="submit">Register</button>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <ErrorBoundary>
        <MuseumView />
      </ErrorBoundary>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <AuthProvider>
        <ApiContext.Provider value={userData}>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </ApiContext.Provider>
      </AuthProvider>
    </Provider>
  </ErrorBoundary>
);

export default AppWrapper;
