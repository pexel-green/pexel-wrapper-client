import { Avatar, Button, Card, Dropdown, TextInput } from "flowbite-react"
import { MdSearch } from "react-icons/md";
import GalleryList from "../component/galleryList";
import { Link, useParams } from "react-router-dom";
import { useFindUserInfoQuery } from "../redux/services/userService";

export default function PublicProfile() {
    let { id } = useParams();
    const { data } = useFindUserInfoQuery(id, {
        skip: !id
    })

    return (
        <>
            <NavBar />
            {
                data ? <main className="px-5 max-w-screen-2xl mx-auto">
                    <div className="flex justify-center flex-col gap-10">
                        <Avatar img="https://avatar.iran.liara.run/public/49" rounded bordered size="xl" />
                        <p className="text-4xl text-center">{data.name}</p>
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
                    <GalleryList search={data.container} />
                </main > : <NoContent />
            }

        </>

    )
}


function NavBar() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-4xl">Pexel</Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <div className=" w-auto md:w-80">
                        <TextInput id="email4" type="email" rightIcon={MdSearch} placeholder="Search for free photo" required />
                    </div>

                </div>
            </div>
        </div>
    )
}

export function NoContent() {
    return (
        <Card className="max-w-2xl mx-auto flex justify-center flex-col text-center p-8">
            <h5 className="text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
                Don’t have any content yet 😔
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
