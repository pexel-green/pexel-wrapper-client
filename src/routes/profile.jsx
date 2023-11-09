import { Avatar, Button, Card, Dropdown } from "flowbite-react"
import Navbar from "../component/navbar-custom"
import { BsFillPencilFill } from "react-icons/bs";
import GalleryList from "../component/galleryList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
    const [haveImage, setHaveImage] = useState(false);

    useEffect(() => {
        setHaveImage(true)
    }, [])

    return (
        <>
            <Navbar />
            <main className="px-5 max-w-screen-2xl mx-auto">
                <div className="flex justify-center flex-col gap-10">
                    <Avatar img="https://avatar.iran.liara.run/public/49" rounded bordered size="xl" />
                    <p className="text-4xl text-center">Sang135@gmail.com</p>
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
                {
                    haveImage ? <GalleryList /> : <NoContent />
                }

            </main >
        </>

    )
}


function NoContent() {
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