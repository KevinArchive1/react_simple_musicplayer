import React, { useEffect, useState } from 'react';
import "../componet_css/album.css"

const myFavorites = [
  'Rubyeye, C!naH',
  'EPIC: The Musical',
  'Steven Universe, Vol. 1',
  'BL8M',
  'KANA-BOON'
];

// function, pipili ng kanta randomly sa list array
const getRandomItems = (arr, num) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };
  
  const SpotifyPreferredAlbums = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  
    const [accessToken, setAccessToken] = useState('');
    const [albums, setAlbums] = useState([]);
    const [selectedAlbumUrl, setSelectedAlbumUrl] = useState('');
  
    // Access sa SPOTIFY API
    useEffect(() => {
      const getAccessToken = async () => {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials'
        });
        const data = await response.json();
        setAccessToken(data.access_token);
      };
  
      getAccessToken();
    }, []);
  
    // fetch ng album
    useEffect(() => {
      if (!accessToken) return;
  
      const fetchAlbums = async () => {
        const selected = getRandomItems(myFavorites, 6); // anim na kanta na available sa list array
        const fetched = [];
  
        for (let name of selected) {
          const res = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=album&limit=1`,
            {
              headers: {
                Authorization: 'Bearer ' + accessToken
              }
            }
          );
          const data = await res.json();
          if (data.albums?.items?.length > 0) {
            fetched.push(data.albums.items[0]);
          }
        }
  
        setAlbums(fetched); // set
      };
  
      fetchAlbums();
    }, [accessToken]);
  
    // album click para lumabas player
    const handleAlbumClick = (albumUrl) => {
        setSelectedAlbumUrl(albumUrl); // taga store ng url
    };
  
    return (
      <div>
        <div className="album-gallery">
          {albums.map((album) => (
            <div key={album.id} className="album" onClick={() => handleAlbumClick(album.external_urls.spotify)}>
              <img
                src={album.images[0]?.url}
                alt={album.name}
                className="album-cover"
              />
            </div>
          ))}
        </div>
  
        {/* spotify player kapag na click album */}
        {selectedAlbumUrl && (
          <div className="spotify-player">
            <iframe
              src={`https://open.spotify.com/embed/album/${selectedAlbumUrl.split('/').pop()}`}
              width="100%"
              height="380"
              frameBorder="0"
              allow="encrypted-media"
              title="Spotify Album Player"
            ></iframe>
          </div>
        )}
      </div>
    );
  };
  
  export default SpotifyPreferredAlbums;
