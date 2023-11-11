import { Dropdown } from "flowbite-react";
import GalleryList from "../component/galleryList";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NoContent } from "./profile";
import { SearchWithBackGround } from ".";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function Search() {
    const query = useQuery();
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (query.get("search")) {
            setMessage(query.get("search"))
        }
        if (query.get("search") === "") {
            setMessage("*")
        }
    }, [query])

    return (
        <>
            <SearchWithBackGround />

            <main className="max-w-screen-2xl mx-auto mt-10">
                <div className="text-3xl">Showing results for "{message === "*" ? 'All' : message}".</div>
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
                {
                    message ? <GalleryList search={message} /> : NoContent
                }

            </main >
        </>

    )
}