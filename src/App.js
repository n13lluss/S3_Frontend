import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
    <header>
      <Navbar />
    </header>
      <main>
        <Routes>
            <Route index element={<Home />}/>
            <Route path='about' element={<About />}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
