import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Artwork {
    title: string;
    image_id: string;
    artist_title: string;
    date_display: string;
    place_of_origin: string;
    medium_display: string;
    wiki_summary: string;
    image_url: string;
}

function ArtworkDetail() {
    const { id } = useParams<{ id: string }>();
    const [artwork, setArtwork] = useState<Artwork | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/artworks/${id}`)
            .then((response) => response.json())
            .then((data: Artwork) => {
                setArtwork(data);
            })
            .catch((error) => {
                console.error("Error fetching artwork details:", error);
            });
    }, [id]);

    if (!artwork) {
        return <div>Loading...</div>;
    }

    return (
        <div className="artwork-detail">
            <h2>{artwork.title}</h2>
            <img src={artwork.image_url} alt={artwork.title} style={{ maxWidth: "100%", cursor: "zoom-in" }} />
            <p>
                <strong>Artist:</strong> {artwork.artist_title}
            </p>
            <p>
                <strong>Date:</strong> {artwork.date_display}
            </p>
            <p>
                <strong>Origin:</strong> {artwork.place_of_origin}
            </p>
            <p>
                <strong>Medium:</strong> {artwork.medium_display}
            </p>
            <p>
                <strong>Additional Information:</strong> {artwork.wiki_summary}
            </p>
        </div>
    );
}

export default ArtworkDetail;
