import { useEffect, useState } from "react";
import { useSearchImageMutation } from "../redux/services/searchCognitive";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSelectImage } from "../redux/user";
import { Spinner } from "flowbite-react";


export default function GalleryList({ search }) {
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(0)
    }, [])
    const handleLoadMore = () => {
        setPage(prev => prev + 1)
    }
    return (
        <section className="gallery">
            <ul className="images">
                <GenerateImage query={{ skip: 0, top: 10 * (page + 1), search: search || "*" }} />
            </ul>
            <button className="load-more" onClick={handleLoadMore}>Load More</button>
        </section>
    )
}


function GenerateImage({ query }) {
    const [images, setImages] = useState([]);
    const [searchImage] = useSearchImageMutation()
    useEffect(() => {
        searchImage(query).unwrap().then(data => {
            setImages(data.value)
        }).catch(err => {
            console.log({ err })
            toast.error("Failed to load image")
        })
    }, [query.top, query, searchImage, query.search])

    if (images?.length > 0) {
        return <ImageList images={images} />
    }
    return <>
        {
            images.length === 0 ? "No result found" : <Spinner />
        }
    </>
}

function ImageList({ images }) {
    const imageHost = "https://pexelblobstorage.blob.core.windows.net/"
    const dispatch = useDispatch()
    const getImagePath = (subPath) => {
        return imageHost + subPath
    }

    const handleSelectImage = (img) => {
        window.document.getElementById("btn-close-modal-rec").click();
        window.showLightbox("phamcaosang135", getImagePath(img.imagePath))
        dispatch(setSelectImage(img))
    }
    return images.map(img =>
        <li className="card" key={img.id}>
            <img onClick={
                () => handleSelectImage(img)
            } src={getImagePath(img.imagePath)} alt="img" />
            <div className="details">
                <div className="photographer">
                    <i className="uil uil-camera"></i>
                    {/* <span>{img.photographer}</span> */}
                    <span>phamcaosang135</span>
                </div>
                <button onClick={
                    () => { window.downloadImg(getImagePath(img.imagePath)); }

                }>
                    <i className="uil uil-import"></i>
                </button>
            </div>
        </li >
    )
}