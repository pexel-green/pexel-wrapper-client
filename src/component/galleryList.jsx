import { useEffect, useState } from "react";
import { useSearchImageMutation } from "../redux/services/searchCognitive";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSelectImage } from "../redux/user";
import { Spinner } from "flowbite-react";
import { useGetBlobMetaDataQuery } from "../redux/services/azureBlobService";
import { useGetUserByContainerQuery } from "../redux/services/mediaDataService";
import { Link } from "react-router-dom";


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
    return images.map(img => <ImageCard key={img.id} imagePath={img.imagePath} img={img} />)
}

function ImageCard({ id, imagePath, img }) {
    const { data } = useGetUserByContainerQuery(imagePath.split("/")[1])

    const { data: metaData } = useGetBlobMetaDataQuery(imagePath)
    const dispatch = useDispatch()
    const imageHost = "https://pexelblobstorage.blob.core.windows.net/"
    const getImagePath = (subPath) => {
        return imageHost + subPath
    }
    const handleSelectImage = () => {
        window.document.getElementById("btn-close-modal-rec").click();
        window.showLightbox(data?.User, getImagePath(imagePath))
        dispatch(setSelectImage({ ...img, metaData }))
    }

    return (
        <li className="card" key={id}>
            <img onClick={
                () => handleSelectImage({ id, imagePath })
            } src={getImagePath(imagePath)} alt="img" />
            <div className="details">
                <div className="photographer">
                    <i className="uil uil-camera"></i>
                    {
                        data && <Link to={`user/${data.User.id}`}>{data.User.name}</Link>
                    }

                </div>
                <button onClick={
                    () => { window.downloadImg(getImagePath(imagePath)); }

                }>
                    <i className="uil uil-import"></i>
                </button>
            </div>
        </li >
    )
}