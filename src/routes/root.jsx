import { Outlet } from "react-router-dom";


export default function Root() {

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