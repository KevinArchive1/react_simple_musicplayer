
const SearchResults = ({tracks}) => {
    if (!tracks || tracks.length === 0) {
        return <div>No results found.</div>;
    }

    return(
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
    );
};

export default SearchResults;