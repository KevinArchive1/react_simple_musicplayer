import './categories-css/Home.css'

const  Home = () => {
    return(
        <div className="Home_holder">
            <div className="Top_Artist">
                <div className='Label'>
                    <h1>Top Artist</h1>
                    <button>see all</button>
                </div>
                <div className='Holder'></div>
            </div>
            <div className="Top_Albums">
                <div className='Label'>
                    <h1>Top Albums</h1>
                    <button>see all</button>
                </div>
                <div className='Holder'></div>
            </div>
            <div className="Trending">
                <div className='Label'>
                    <h1>Trending</h1>
                </div>
                <div className='Holder'></div>
            </div>
            
        </div>
    )
}

export default Home;