import "../componet_css/Sidebar.css"

const Sidebar = ({setActivePage}) => {
    return (
        <aside className="Sidebar_holder">
            <div>
                <h1>Tech Tunes</h1>
                <nav>
                    <div onClick={() => setActivePage('home')}>🏠 Home</div>
                    <div onClick={() => setActivePage('artist')}>🎤 Artists</div>
                    <div onClick={() => setActivePage('albums')}>💿 Albums</div>
                    <div onClick={() => setActivePage('favorites')}>❤️ Favorites</div>
                </nav>

            </div>
        </aside>
    );
};

export default Sidebar;