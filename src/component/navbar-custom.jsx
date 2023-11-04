import { TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import { MdSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetUserState } from "../redux/user";

export default function Navbar() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.clear()
        dispatch(resetUserState())
        toast.success("Sign out sucessfully")
    }

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
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://avatar.iran.liara.run/public/49" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link to={"/profile"}>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to={"/upload"}>
                                Upload
                            </Link>
                        </li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
