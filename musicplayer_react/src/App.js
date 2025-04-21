import SpotifySearch from './components/search';
import SpotifyRandomAlbum from './components/album';
import './App.css';
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';
import MainContent from './components/Main-Content';
import { useState } from 'react';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (results) => {
    setSearchResults(results);
    setActivePage('search');
  }

  return (
    <div className="App">
      <div className='holder1'>
        <Sidebar setActivePage={setActivePage} />
        <main>
          <SpotifySearch onResults={(results) => {
            setSearchResults(results);
            setActivePage('search');
          }}/>
          <MainContent             
            activePage={activePage} searchResults={searchResults}   />
        </main>
      </div>
      <PlayerBar />
    </div>
  );
}

export default App;
