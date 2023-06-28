import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/Navbar';
import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateGame from "./pages/CreateGame";
import QuizSelect from "./components/QuizSelect";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import "./App.css";
import Question from "./components/Question";
import FinalScreen from "./components/FinalScreen";
import { setContext } from "@apollo/client/link/context";
import PrivateRoute from "./components/PrivateRoute";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="container">
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/select"
              element={
                <PrivateRoute>
                  <QuizSelect />
                </PrivateRoute>
              }
            />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path="/quiz" element={<Question />} />
            <Route path="/final" element={<FinalScreen />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
