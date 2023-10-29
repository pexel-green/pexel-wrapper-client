import { useEffect, useState } from "react";

// let searchTerm = null;
const apiKey = "NIpNy4vBDKSth35kuuw4hYU2r2QW7uk14BM9LdwzkDCAdjDNN4ERmByk";


export default function GalleryList() {

    return (
        <section className="gallery">
            <ul className="images">
                <GenerateImage apiURL={generateUrl("latest", 1, 15)} />
            </ul>
            <button className="load-more">Load More</button>
        </section>
    )
}

function generateUrl(searchTerm = "hello", currentPage = 1, perPage = 15) {
    return `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`
}
// const imageWrapper = document.querySelector(".images");
// const searchInput = document.querySelector(".search input");
// const loadMoreBtn = document.querySelector(".gallery .load-more");



function GenerateImage({ apiURL }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch(apiURL, {
            headers: { Authorization: apiKey }
        }).then(res => res.json()).then(data => {
            console.log(data)
            setImages(data.photos)
        }).catch(() => alert("Failed to load images!"));
    }, [])

    if (images?.length > 0) {
        return <ImageList images={images} />
    }
    return <>
        Loading
    </>
}

function ImageList({ images }) {
    console.log(images)
    return images.map(img =>
        <li className="card" key={img.src.large2x}>
            <img onClick={
                () => { window.showLightbox(img.photographer, img.src.large2x) }
            } src={img.src.large2x} alt="img" />
            <div className="details">
                <div className="photographer">
                    <i className="uil uil-camera"></i>
                    <span>{img.photographer}</span>
                </div>
                <button onClick={
                    () => { window.downloadImg(img.src.large2x); }

                }>
                    <i className="uil uil-import"></i>
                </button>
            </div>
        </li >
    )
}

// const loadMoreImages = () => {
//     currentPage++; // Increment currentPage by 1
//     // If searchTerm has some value then call API with search term else call default API
//     let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
//     apiUrl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiUrl;
//     getImages(apiUrl);
// }

// const loadSearchImages = (e) => {
//     // If the search input is empty, set the search term to null and return from here
//     if (e.target.value === "") return searchTerm = null;
//     // If pressed key is Enter, update the current page, search term & call the getImages
//     if (e.key === "Enter") {
//         currentPage = 1;
//         searchTerm = e.target.value;
//         imageWrapper.innerHTML = "";
//         getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}`);
//     }
// }

// loadMoreBtn.addEventListener("click", loadMoreImages);
// searchInput.addEventListener("keyup", loadSearchImages);