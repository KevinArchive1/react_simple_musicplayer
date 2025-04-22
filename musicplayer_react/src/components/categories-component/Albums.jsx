import SpotifyPreferredAlbums from '../album';
import '../categories_css/albums.css'

const  Albums = () => {
    return(
        <>
            <div className='container'>
                <h1>Albums</h1>
                <SpotifyPreferredAlbums />
            </div>
        </>
    )
}

export default Albums;
