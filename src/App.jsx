import { Fragment, useEffect, useState } from "react";
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";

import Layout from "./layout";

import Header from "./components/header";
import Footer from "./components/footer";

import Home from "./pages/home";
import DetailNote from "./pages/detail-note";
import CreateNote from "./pages/create-note";
import ArchivedNote from "./pages/archived-note";
import NotFound from "./pages/not-found";
import Login from "./pages/login";
import Register from "./pages/register";

import { getUserLogged, putAccessToken } from "./utils/api";

export default function App() {
  const navigate = useNavigate();
  const [autchedUser, setAutchedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState("" ?? searchParams.get("keyword"));

  const onKeywordChange = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  useEffect(() => {
    const fetchDataUserLogged = async () => {
      const { data } = await getUserLogged();

      setAutchedUser(data);
      setInitializing(false);
    };

    fetchDataUserLogged();
  }, [setAutchedUser, setInitializing]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);

    const { data } = await getUserLogged();

    setAutchedUser(data);
  };

  const onLogoutHandler = () => {
    putAccessToken("");
    setAutchedUser(null);

    navigate("/");
  };

  if (initializing) {
    return null;
  }

  if (autchedUser === null) {
    return (
      <>
        <Header autchedUser={autchedUser} />
        <main className="max-w-5xl pt-24 mx-4 lg:mx-auto min-h-[100dvh]">
          <Routes>
            <Route
              path="/*"
              element={<Login loginSuccess={onLoginSuccess} />}
            />
            <Route path="register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <Fragment>
      <Header autchedUser={autchedUser} onLogout={onLogoutHandler} />
      <main className="max-w-5xl pt-24 mx-4 lg:mx-auto min-h-[100dvh]">
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Home keyword={keyword} onChangeHandler={onKeywordChange} />
              }
            />
          </Route>
          <Route path="/notes">
            <Route path=":noteId" element={<DetailNote />} />
            <Route path="create" element={<CreateNote />} />
            <Route element={<Layout />}>
              <Route
                path="archived"
                element={
                  <ArchivedNote
                    keyword={keyword}
                    onChangeHandler={onKeywordChange}
                  />
                }
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Fragment>
  );
}
