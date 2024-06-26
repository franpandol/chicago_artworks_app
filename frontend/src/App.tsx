// App.tsx
import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import ArtworkList from "./components/ArtworkList";
import ArtistList from "./components/ArtistList";
import ArtworkDetail from "./components/ArtworkDetail";
import ArtistDetail from "./components/ArtistDetail";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Art Inspiration Board</h1>

        <div className="app-layout">
          {/* Sidebar */}
          <div className="sidebar">
            <ul>
              <li>
                <Link to="/artworks">Artworks</Link>
              </li>
              <li>
                <Link to="/artists">Artists</Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <Routes>
              <Route path="/artworks/:id" element={<ArtworkDetail />} />
              <Route path="/artworks" element={<ArtworkList />} />
              <Route path="/artists/:id" element={<ArtistDetail />} />
              <Route path="/artists" element={<ArtistList />} />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
