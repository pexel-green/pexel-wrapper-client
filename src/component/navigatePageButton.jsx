import { Link } from "react-router-dom";

export default function NavigatePageButton({ route, content, extraClass = "" }) {
    return (
        <Link
            to={route}
            className={"font-semibold rounded-lg top-4 right-4 z-10 absolute inline-block bg-white text-gray-600 px-5 py-3 cursor-pointer " + extraClass}>
            {content}
        </Link>
    )
}

