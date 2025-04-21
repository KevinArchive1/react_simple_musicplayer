import Home from "./categories-component/Home";
import Genre from "./categories-component/Genre"
import Favorites from "./categories-component/Favorites";
import Artists from "./categories-component/Artists";
import Albums from "./categories-component/Albums";
import SearchResults from "./SearchResult";



const MainContent = ({activePage, searchResults}) => {
    const renderContent = () => {
        switch (activePage) {
            case "home":
                return <Home />
            case "genre":
                return <Genre />
            case "favorites":
                return <Favorites />
            case "artist":
                return <Artists />
            case "albums":
                return <Albums />
            case "search":
                return (
                    <>
                      <SearchResults tracks={searchResults} />
                    </>
                  );
            default:
                return <Home />
        }
    };

    return(
        <div>
            {renderContent()}
        </div>
    )
};

export default MainContent;

