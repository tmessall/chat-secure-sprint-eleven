//import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./components/navbar/navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about_project";
import Video from "./pages/video_feed";
import CodeIt from './pages/code_it';
import Pagetop from './components/Pagetop/pagetop';
import Footer from './components/footer/footer';



function App() {
  return (
    <>
    <div className="pagetop">
      <Pagetop />
    </div>
    <div className="navigation">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about_project" element={<About />} />
          <Route path="/video_feed" element={<Video />} />
          <Route path="/code_it" element={<CodeIt />} />
        </Routes>
      </Router>
    </div>
    <Footer />
    </>
  );
}

ReactDOM.render(
  <App/>, 
  document.getElementById('root')
);


export default App;
