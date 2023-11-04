import { useDispatch, useSelector } from "react-redux";
import GalleryList from "../component/galleryList";
import { Link } from "react-router-dom"
import { Dropdown } from "flowbite-react";
import toast from "react-hot-toast";
import { resetUserState } from "../redux/user";

export default function Index() {
    return (
        <>
            <SearchWithBackGround />
            <GalleryList />
        </>
    );
}

function SearchWithBackGround() {
    const email = useSelector(state => state.user.email)
    console.log({ email })
    return (
        <section className="search">
            {!email ? <JoinButton /> : <UserLogged email={email} />}

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
        <Link
            to={"/login"}
            className="font-semibold rounded-lg top-4 right-4 z-10 absolute inline-block bg-white text-gray-600 px-5 py-3 cursor-pointer">
            Join
        </Link>
    )
}


function UserLogged({ email }) {
    const dispatch = useDispatch()
    const handleclick = (url) => {
        console.log({ url })
    }
    const handleLogout = () => {
        localStorage.clear()
        dispatch(resetUserState())
        toast.success("Sign out sucessfully")
    }
    return (
        <span
            className="font-semibold rounded-lg top-4 right-4 z-10 absolute inline-block text-gray-100 px-5 py-3 cursor-pointer"
        >
            <Dropdown label={email} dismissOnClick={false} inline>
                <Dropdown.Item onClick={() => handleclick("/profile")}>Dashboard</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
        </span>
    )
}