import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home.jsx';
import BlogList from './pages/BlogList';
import BlogView from './pages/BlogView.jsx';
import BlogCreate from './pages/BlogCreate';
import BlogEdit from './pages/BlogEdit';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/create" element={<BlogCreate />} />
        <Route path="/edit/:id" element={<BlogEdit />} />
      </Routes>
    </Router>
  );
}

export default App;