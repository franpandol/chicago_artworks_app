import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Artist {
    title: string;
    wiki_summary: string;
    image_url: string;
    artworks: {
        id: number;
        title: string;
    }[];
    description: string;
}

function ArtistDetail() {
    const { id } = useParams<{ id: string }>();
    const [artist, setArtist] = useState<Artist | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/artists/${id}`)
            .then(response => response.json())
            .then((data: Artist) => {
                console.log(data);
                setArtist(data);
            })
            .catch(error => {
                console.error("Error fetching artist details:", error);
            });
    }, [id]);

    if (!artist) {
        return <div>Loading...</div>;
    }

    return (
        <div className="artist-detail">
            <h2>{artist.title}</h2>
            <img 
                src={artist.image_url} 
                alt={artist.title} 
                style={{maxWidth: '100%'}}
            />
            <p><strong>Additional Information:</strong> {artist.description}</p>
            <h3>Artworks</h3>
            <ul>
                {artist.artworks.map(artwork => (
                    <li key={artwork.id}>
                        <a href={`/artworks/${artwork.id}`}>{artwork.title}</a>
                    </li>
                ))}
            </ul>

            
        </div>
    );
}

export default ArtistDetail;
