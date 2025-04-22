import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../componet_css/Search.css'
import MicOn from './img/mic-on.png';
import MicOff from './img/mic-off.png';


const SpotifySearch = ({ onResults }) => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  const [accessToken, setAccessToken] = useState('');
  const [query, setQuery] = useState('');

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
    if (!query.trim()) return;

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    const data = await response.json();
    onResults(data.tracks.items);
  };

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setQuery(transcript);
  }, [transcript])

  useEffect(() => {
    if (query.trim() === '') {
      onResults([]); 
      return;
    }
  
    const delayDebounce = setTimeout(() => {
      searchMusic();
    }, 1000);
  
    return () => clearTimeout(delayDebounce);
  }, [query]);  


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='Search_holder'>
      <input
        type="text"
        placeholder="Search Music"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='input'
      />
      <button onClick={SpeechRecognition.startListening} className="mic-button">
        <img
          src={listening ? MicOn : MicOff}
          alt={listening ? 'Listening' : 'Start Voice Search'}
          className="mic-icon"
        />
      </button>

    </div>
  );
};

export default SpotifySearch;
