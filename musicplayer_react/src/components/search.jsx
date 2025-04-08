import React, { useState, useEffect } from 'react';

const SpotifySearch = () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  const [accessToken, setAccessToken] = useState('');
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);

  // Fetch access token when component mounts
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

  // Search function
  const searchMusic = async () => {
    if (!query) return;

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    const data = await response.json();
    setTracks(data.tracks.items);
  };

  return (
    <div>
      <h1>Search for Music</h1>
      <input
        type="text"
        placeholder="balls"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchMusic}>Search</button>

      <div id="results" >
        {tracks.map((track) => (
          <div key={track.id} className="track">
            <strong>{track.name}</strong> by {track.artists.map(artist => artist.name).join(', ')}
            <br />
            <iframe
              src={`https://open.spotify.com/embed/track/${track.id}`}
              allow="encrypted-media"
              title={track.name}
              width="300"
              height="300"
              frameBorder="0"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotifySearch;