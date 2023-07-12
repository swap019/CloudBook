import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from "./context/notes/NoteState";
function App() {
  return (
    <>
      <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
