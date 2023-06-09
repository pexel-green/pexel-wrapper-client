import GalleryList from "../component/galleryList";

export default function Index() {
    return (
        <>
            <JoinButton />
            <SearchWithBackGround />
            <GalleryList />
        </>
    );
}

function SearchWithBackGround() {
    return (
        <section className="search">
            <img src="https://images.pexels.com/photos/16714211/pexels-photo-16714211.jpeg?auto=compress&bri=5&cs=tinysrgb&fit=crop&h=500&w=1400&dpr=1" alt="search-img" />
            <div className="content">
                <h1>The best free medium, royalty free</h1>
                <p>Search and download mages & videos shared by creators</p>
                <div className="search-box">
                    <i className="uil uil-search"></i>
                    <input type="text" placeholder="Search images & videos" />
                </div>
            </div>
        </section>
    )
}

function JoinButton() {
    return (
        <div className="container mx-auto text-right relative">
            <span className="font-semibold rounded-lg top-4 z-10 absolute inline-block bg-white text-gray-600 px-5 py-3 cursor-pointer">
                Join
            </span>
        </div>
    )
}
