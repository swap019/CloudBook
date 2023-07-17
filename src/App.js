import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from "./context/notes/NoteState";
import Signup from "./components/Signup"
import Logindo from "./components/Logindo";

function App() {
  return (
    <>
      <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Logindo/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
