import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import LoginSignup from './components/LoginSignup';
import QuizSelect from './components/QuizSelect';
import Profile from './components/Profile';
import NotFound from './components/NotFound'
import './App.css'; 
import Question from './components/Question';
import FinalScreen from './components/FinalScreen';
import { setContext } from '@apollo/client/link/context';
import PrivateRoute from './components/PrivateRoute';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div></div>
      <Header />
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={<Home />}
          />
          <Route 
            path="/login" 
            element={<LoginSignup />}
          />
          <Route
          path="/select"
          element={
            <PrivateRoute>
              <QuizSelect />
            </PrivateRoute>
          }
        />
          <Route 
            path="/quiz" 
            element={<Question />}
          />
          <Route 
            path="/final" 
            element={<FinalScreen />}
          />
          <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
          <Route 
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Router>
      <Footer />
      </ApolloProvider>
  );
}

export default App;