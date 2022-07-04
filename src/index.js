import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './utils/store.js';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Nav from './components/Nav';
import Footer from './components/Footer';
import reportWebVitals from './reportWebVitals';
import SignIn from './pages/SignIn.jsx';
import './styles/main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './pages/Error.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </Provider>

  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

