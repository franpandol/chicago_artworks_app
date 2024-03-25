import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Artwork {
  id: number;
  image_id: string;
  title: string;
  artist_title: string;
  image_url: string;
}

function ArtworkList() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/artworks/`)

      .then(response => response.json())
      .then(data => {
        setArtworks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching artworks:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="artwork-list">
      <h2>Artworks</h2>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="artworks-grid">
          {artworks.map(artwork => (
            <Link key={artwork.id} to={`/artworks/${artwork.id}`}>
              <div className="artwork-item">
                <img 
                  src={artwork.image_url}
                  alt={artwork.title} 
                />
                <h3>{artwork.title}</h3>
                <p>{artwork.artist_title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArtworkList;
