import useSWR from 'swr';

interface Artist {
  id: number;
  image_url: string;
  title: string;
}


const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ArtistList() {
  const { data, error } = useSWR<Artist[]>(`${import.meta.env.VITE_API_URL}/api/artists`, fetcher);
  
  if (error) {
    return <div className="artist-list"><h2>Artists</h2><div>Error loading artists.</div></div>;
  }

  if (!data) {
    return (
      <div className="artist-list">
        <h2>Artists</h2>
        <div className="spinner-container"><div className="spinner"></div></div>
      </div>
    );
  }

  return (
    <div className="artist-list">
      <h2>Artists</h2>
      <ul>
        {data.map(artist => (
          <li key={artist.id}>
            <img src={artist.image_url} alt={artist.title} className="artist-image" />
            <span>{artist.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistList;
