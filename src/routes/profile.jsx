import { Avatar, Button, Card, Dropdown } from "flowbite-react"
import Navbar from "../component/navbar-custom"
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import GalleryList from "../component/galleryList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteBlobMutation, useGetBlobsByUserMutation, useGetUserByContainerQuery } from "../redux/services/mediaDataService";
import { setSelectImage } from "../redux/user";
import { useGetBlobMetaDataQuery } from "../redux/services/azureBlobService";
import toast from "react-hot-toast";

export default function Profile() {
    const user = useSelector(state => state.user);
    const [blobs, setBlobs] = useState([])
    const [getBlobsByUser] = useGetBlobsByUserMutation()
    useEffect(() => {
        user && user.id && getBlobsByUser(user.id).unwrap().then(res => setBlobs(res.data)).catch(err => console.log({ err }))
    }, [user, user.id, getBlobsByUser])
    return (
        <>
            <Navbar />
            <main className="px-5 max-w-screen-2xl mx-auto">user
                <div className="flex justify-center flex-col gap-10">
                    <Avatar img="https://avatar.iran.liara.run/public/49" rounded bordered size="xl" />
                    <p className="text-4xl text-center">{user?.email}</p>
                    <label htmlFor="changeImage" className="cursor-pointer box-border text-center">
                        <Link to="/edit-profile">
                            <button className="text-white pointer-events-none border-[#05a081] bg-[#05a081] cursor-pointer inline-flex justify-center items-center rounded-md h-[50px] w-max font-[500] px-7 ">
                                <BsFillPencilFill className="mr-4 h-5 w-5" />
                                <span>Edit Profile</span>
                            </button>
                        </Link>
                    </label>
                    <div className="flex justify-end gap-4 profile-filter">
                        <Dropdown label="Videos & Photos" size="sm">
                            <Dropdown.Item>Videos & Photos</Dropdown.Item>
                            <Dropdown.Item>Videos</Dropdown.Item>
                            <Dropdown.Item>Photos</Dropdown.Item>
                        </Dropdown>
                        <Dropdown label="Recent" size="sm">
                            <Dropdown.Item>Recent</Dropdown.Item>
                            <Dropdown.Item>Oldest</Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
                <section className="gallery">
                    <ul className="images">
                        {blobs.length > 0 ? <ImageList images={blobs} setBlobs={setBlobs} /> : <NoContent />}
                    </ul>
                </section>
            </main >
        </>
    )
}

function ImageList({ images, setBlobs }) {
    console.log({ images })
    const deleteSuccess = (index) => {
        setBlobs(prev => {
            return prev.filter((img, id) => id !== index)
        })
    }
    return images.map((img, id) => <ImageCard key={img.id} id={id} imagePath={img.imagePath} img={img} deleteSuccess={deleteSuccess} />)
}

function ImageCard({ id, imagePath, img, deleteSuccess }) {
    const user = useSelector(state => state.user);

    const [deleteBlob] = useDeleteBlobMutation()

    const { data: metaData } = useGetBlobMetaDataQuery(imagePath)
    const dispatch = useDispatch()
    const imageHost = "https://pexelblobstorage.blob.core.windows.net/"
    const getImagePath = (subPath) => {
        return imageHost + subPath
    }
    const handleSelectImage = () => {
        console.log(window)
        window.showLightbox(user, getImagePath(imagePath))
        dispatch(setSelectImage({ ...img, metaData }))
    }

    const handleClickDelete = () => {
        let text = "Are you sure to delete this image";
        if (confirm(text) == true) {
            deleteBlob({ id: img.id, imagePath }).unwrap().then(res => {
                console.log({ res })
                deleteSuccess(id)
                toast.success("Image deleted")
            }).catch(err => {
                toast.error("Failed to delete image.")
            })
            console.log("Deleting")
        }
    }

    return (
        <li className="card" key={img.id}>
            <img onClick={handleSelectImage} src={getImagePath(imagePath)} alt="img" />
            <div className="details">
                <button className="import-btn" onClick={
                    () => { window.downloadImg(getImagePath(imagePath)); }
                }>
                    <i className="uil uil-import"></i>
                </button>
                <BsFillTrash3Fill className="delete-btn" onClick={handleClickDelete} />
            </div>
        </li >
    )
}


export function NoContent() {
    return (
        <Card className="max-w-2xl mx-auto flex justify-center flex-col text-center p-8">
            <h5 className="text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
                You don’t have any content yet 😔
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                It's ok, we know it's probably hard to choose what to upload from all your amazing photos. You can come back and upload at any time. In the meantime, how about some inspiration from the talented photographers on Pexels?
            </p>
            <Button className="w-36 bg-[#05a081] mx-auto px-2 py-2">
                Get Inspire
            </Button>
        </Card>
    );
}