
import React, { useEffect, useRef, useState } from 'react';

const myArtist = [
    'Rubyeye, C!naH',
    'EPIC: The Musical',
    'Steven Universe, Vol. 1',
    'Ado',
    'YOASOBI',
    'BL8M',
    'KANA-BOON',
    'Laufey',
    'Rex Orange County',
    'NIKI',
    'BINI',
    'FLOW',
    'Kanaria',
    'LiSA'
];

// function, pipili ng kanta randomly sa list array
const getRandomItems = (arr, num) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};
  
const Artist = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

    const [accessToken, setAccessToken] = useState('');
    const [artist, setartist] = useState([]);
    const [selectedAlbumUrl, setSelectedAlbumUrl] = useState('');

    const titleRefs = useRef({});
    const artistRefs = useRef({});
    const [overflowIds, setOverflowIds] = useState({});

    // para sa text, mag o-overflow tapos kapag ni hover mag m-marque animation kaso hindi ko alam bakit hindi nagana
    useEffect(() => {
        const newOverflowIds = {};
        artist.forEach(album => {
          const titleEl = titleRefs.current[album.id];
          const artistEl = artistRefs.current[album.id];
      
          newOverflowIds[album.id] = {
            title: titleEl?.scrollWidth > titleEl?.clientWidth,
            artist: artistEl?.scrollWidth > artistEl?.clientWidth,
          };
        });
      
        console.log('Overflow Detection:', newOverflowIds);
        setOverflowIds(newOverflowIds);
    }, [artist]);
        
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

// fetch ng artist
useEffect(() => {
    if (!accessToken) return;

    const fetchartist = async () => {
    const selected = getRandomItems(myArtist, 14); // anim na kanta na available sa list array
    const fetched = [];

    for (let name of selected) {
        const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1`,
        {
            headers: {
            Authorization: 'Bearer ' + accessToken
            }
        }
        );
        const data = await res.json();
        if (data.artists?.items?.length > 0) {
            fetched.push(data.artists.items[0]);
            }
    }

    setartist(fetched); // set
    };

    fetchartist();
}, [accessToken]);

// album click para lumabas player
const handleAlbumClick = (albumUrl) => {
    setSelectedAlbumUrl(albumUrl); // taga store ng url
};


return (
    <div>
        <div className="album-gallery">
            {artist.map((artists) => (
            <div key={artists.id} className="album">
                <img
                    src={artists.images[0]?.url}
                    alt={artists.name}
                    className="album-cover"
                    onClick={() => handleAlbumClick(artists.external_urls.spotify)}
                />
                <div className="album-info">
                    <div className="album-text">
                        <div className="marquee-wrapper">
                            <div
                                className={`album-title ${overflowIds[artists.id]?.title ? 'hover-marquee' : ''}`}
                                ref={(el) => titleRefs.current[artists.id] = el}
                                >
                                {artists.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            ))}
        </div>

        {/* spotify player kapag na click album */}
        {selectedAlbumUrl && (
            <div className="spotify-player">
            <iframe
                src={`https://open.spotify.com/embed/artist/${selectedAlbumUrl.split('/').pop()}`}
                width="100%"
                height="380"
                frameBorder="0"
                allow="encrypted-media"
                title="Spotify Album Player"
            ></iframe>
            </div>
        )}
    </div>
)
}

export default Artist;