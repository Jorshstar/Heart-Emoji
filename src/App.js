import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Love from './Pages/Love';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Love />} />
      </Routes>
    </Router>
  );
}

export default App;
