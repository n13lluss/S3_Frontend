import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import BlogList from './pages/Blog/BlogList';
import BlogView from './pages/Blog/BlogView';
import BlogCreate from './pages/Blog/BlogCreate';
import BlogEdit from './pages/Blog/BlogEdit';
import './App.css';

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/create" element={<BlogCreate />} />
        <Route path="/edit/:id" element={<BlogEdit />} />
      </Routes>
    </>
  );
}

export default App;
