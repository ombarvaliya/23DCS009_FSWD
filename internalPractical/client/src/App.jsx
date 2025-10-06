import React from 'react';
import Nav from './components/Nav';

export default function App({ children }) {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
