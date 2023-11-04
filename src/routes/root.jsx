import { Outlet } from "react-router-dom";
import { useVerifyTokenMutation } from "../redux/services/authService";
import { useEffect } from "react";


export default function Root() {
    const [verifyToken] = useVerifyTokenMutation()
    useEffect(() => {
        const token = localStorage.getItem("token");
        token && verifyToken(token).unwrap().then(res => console.log({ res })).catch(err => console.log({ err }))
    }, [])

    return (
        <>
            <Outlet />
            <ModalImage />
        </>
    );
}

function ModalImage() {
    return <div className="lightbox">
        <div className="wrapper">
            <header>
                <div className="photographer">
                    <i className="uil uil-camera"></i>
                    <span></span>
                </div>
                <div className="buttons">
                    <i className="uil uil-import" onClick={(e) => window.downloadImg(e.target.getAttribute("data-img"))}></i>
                    <i className="close-icon uil uil-times" onClick={() => window.hideLightbox()}></i>
                </div>
            </header>
            <div className="preview-img">
                <div className="img"><img src="" alt="preview-img" /></div>
            </div>
        </div>
    </div>
}