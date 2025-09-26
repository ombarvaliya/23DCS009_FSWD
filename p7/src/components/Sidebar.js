import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${!isOpen ? 'closed' : ''}`}>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/about')}>About</button>
      <button onClick={() => navigate('/contact')}>Contact</button>
    </div>
  );
};

export default Sidebar;
