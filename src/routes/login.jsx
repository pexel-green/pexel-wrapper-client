import { useState } from "react"
import { useLoginMutation, useVerifyTokenMutation } from "../redux/services/authService"
import toast from "react-hot-toast";
import useAuthRedirect from "../custom-hook/useAuthRedirect";
import NavigatePageButton from "../component/navigatePageButton";
var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Login() {

    const [login, { isLoading }] = useLoginMutation()
    const [verifyToken] = useVerifyTokenMutation()

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null)
    const submitLogin = () => {
        if (!email) {
            return toast.error("Email must be enter")
        }
        if (!email.match(validRegex)) {
            return toast.error("Email format is wrong")
        }

        if (!password) {
            return toast.error("Password must be enter")
        }

        if (password.length < 6) {
            return toast.error("Password length must be higher than 5")
        }

        login({
            "where": {
                email,
                password
            }
        }).unwrap().then((res) => {
            console.log({ res })
            localStorage.setItem("token", res.token);
            toast.success("Login sucess")
            verifyToken(localStorage.getItem("token"))
        }).catch((err) => {
            console.log({ err })
            toast.error(err.data.message)
        })

    }

    useAuthRedirect();

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-cover">
                <NavigatePageButton route={"/"} content={"Homepage"} />
                <NavigatePageButton route={"/register"} content={"Register"} extraClass="right-40" />
                <div className="bg-white rounded-lg shadow-lg p-6 block z-10 w-11/12 md:w-[500px]">
                    <h1 className="text-3xl font-semibold text-center mb-6 mt-3">Welcome back.</h1>
                    <div className="mb-6">
                        <label className="block font-medium mb-2 text-gray-600" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="border border-gray-400 px-3 py-4 w-full rounded-lg font-bold text-gray-500"
                            maxLength={30}
                            type="email"
                            placeholder="name@email.com"
                            id="email"
                            name="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block font-medium mb-2 text-gray-600" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="border border-gray-400 px-3 py-4 w-full rounded-lg font-bold text-gray-500"
                            maxLength={30}
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <a className="text-gray-500 hover:text-gray-800 mb-5 md:mb-0 underline decoration-dotted" href="#">
                            Forgot your password?
                        </a>
                        {
                            isLoading ?
                                <button
                                    className="block text-white font-bold py-4 mt-5 rounded w-full bg-[#3f5450]">
                                    Sign In
                                </button>
                                :
                                <button
                                    disabled={isLoading}
                                    onClick={submitLogin}
                                    className="block hover:bg-[#059377] text-white font-bold py-4 mt-5 rounded w-full bg-[#05a081]">
                                    Sign In
                                </button>
                        }

                    </div>
                </div>
                <div
                    className="hidden md:block absolute top-0 left-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${"https://wallpapers.com/images/featured/720p-nature-background-te0eo4yinuw49nh1.jpg"})`,
                    }}
                ></div>
            </div>
        </>
    )
}