import "../componet_css/Sidebar.css";
import TechTunes from "../assets/TechTune.png";
import Home from "../assets/home.png"
import Artists from "../assets/artist.png"
import Albumns from "../assets/album.png"
import Playlist from "../assets/playlist.png"

const Sidebar = ({ setActivePage }) => {
    return (
        <aside className="Sidebar_holder">
            <div className="Sidebar_content">
                <div className="Sidebar_logo">
                    <img src={TechTunes} alt="" className="Sidebar_logoImage" />
                    <span>Tech Tune</span>
                </div>
                <nav className="Sidebar_nav">
                    <div className="Sidebar_link" onClick={() => setActivePage('home')}>
                        <img src={Home} alt="" className="Sidebar_navIcon" /> Home
                    </div>
                    <div className="Sidebar_link" onClick={() => setActivePage('artist')}>
                        <img src={Artists} alt="" className="Sidebar_navIcon" /> Artists
                    </div>
                    <div className="Sidebar_link" onClick={() => setActivePage('albums')}>
                        <img src={Albumns} alt="" className="Sidebar_navIcon" /> Albums
                    </div>
                    <div className="Sidebar_link" onClick={() => setActivePage('playlists')}>
                        <img src={Playlist} alt="" className="Sidebar_navIcon" /> Playlists
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;