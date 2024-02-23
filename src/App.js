import './App.css';
import Navbar from './Components/Navbar/Navbar'
import Posts from './Components/Posts/Posts'
import Footer from './Components/Footer/Footer' 

function App() {
  return (
    <>
    <div>
      <Navbar />
      <Posts classname="Posts"/>
      <Footer />
    </div>
    </>
  );
}

export default App;
