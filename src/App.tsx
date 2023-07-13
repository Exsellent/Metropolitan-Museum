// eslint-disable @typescript-eslint/no-unused-vars /
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Provider } from "react-redux";
import store from "redux/store";
import { AuthProvider, useAuth } from "hooks/useAuth";
import ApiContext from "ApiContext/ApiContext";
import ErrorBoundary from "ErrorBoundary/ErrorBoundary";
import MuseumView from "components/MuseumView";
import { IArtwork } from "features/artworksSlice";
import { IExhibition } from "features/exhibitionsSlice";
import { IFavorite } from "features/favoritesSlice";

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
  removeArtwork: (id: number) => void;
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
  removeArtwork: (id: number) => {
    userData.artworks = userData.artworks.filter(
      (art) => art.id !== id.toString()
    );
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
                    <Field type="password" id="password" name="password" />
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
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                  </div>
                  <button type="submit">Register</button>
                </Form>
              )}
            </Formik>
          </>
        )}
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
          <App />
        </ApiContext.Provider>
      </AuthProvider>
    </Provider>
  </ErrorBoundary>
);

export default AppWrapper;
