import React from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';
import { Routes, Route } from 'react-router-dom';
import Geolocation from './components/localisation/Geolocalisation';

const ThemePage = ({ theme }) => {

  return <Quiz theme={theme} />;
};

const App = () => {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Quiz  theme="football" />} />
          <Route path="/basket" element={<Geolocation/>} />
          <Route path="/tennis" element={<ThemePage theme="tennis" />} />
          <Route path="/culture" element={<ThemePage theme="culture" />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
