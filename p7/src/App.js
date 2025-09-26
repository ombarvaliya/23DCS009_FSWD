import React, { useState } from 'react';
import Sidebar from './components/Sidebar'; 
import Home from './pages/Home';           
import About from './pages/About';        
import Contact from './pages/Contact';  
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <Sidebar isOpen={isOpen} />
        <div className={`content ${!isOpen ? 'closed' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
