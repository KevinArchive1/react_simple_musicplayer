import SpotifySearch from './components/search';
import SpotifyRandomAlbum from './components/album';
import './App.css';

function App() {
  return (
    <div className="App">
      <SpotifySearch />
      <SpotifyRandomAlbum />
    </div>
  );
}

export default App;
