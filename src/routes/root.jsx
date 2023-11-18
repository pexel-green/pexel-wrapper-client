import { Outlet, useLocation } from "react-router-dom";
import { useVerifyTokenMutation } from "../redux/services/authService";
import { useEffect } from "react";
import GalleryList from "../component/galleryList";
import { useDispatch, useSelector } from "react-redux";
import { setSelectImage } from "../redux/user";


export default function Root() {
    const [verifyToken] = useVerifyTokenMutation()
    useEffect(() => {
        const token = localStorage.getItem("token");
        token && verifyToken(token).unwrap().then(res => console.log({ res })).catch(err => { console.log({ err }); localStorage.clear() })
    }, [])

    return (
        <>
            <Outlet />
            <ModalImage />
            <ModalRecommend />
        </>
    );
}

function ModalImage() {
    const location = useLocation()

    if (location?.pathname !== "/profile") {
        return <div className="lightbox">
            <div className="wrapper">
                <header>
                    <div className="photographer">
                        <i className="uil uil-camera"></i>
                        <span></span>
                    </div>
                    <div className="buttons">
                        <i className="uil uil-image-plus mr-3" onClick={() => document.getElementById('ModalRecommend').showModal()}></i>
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
    return <div className="lightbox">
        <div className="wrapper">
            <header>
                <div className="photographer">
                    <i className="uil uil-camera"></i>
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

function ModalRecommend() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.user.selectImageData)
    const handleClickClose = () => {
        dispatch(setSelectImage(null))
    }
    return <>
        <dialog id="ModalRecommend" className="modal">
            <div className="modal-box w-full max-w-[98%]">
                <form className="modal-action flex justify-between items-center" method="dialog">
                    <div className="text-3xl font-bold">Similar images</div>
                    <button className="btn" onClick={handleClickClose} id="btn-close-modal-rec">Close</button>
                </form>
                {

                }
                <GalleryList search={`${data?.categories} ${data?.color}  ${data?.tags?.split(",").join(" ")} `} />
            </div>
        </dialog >
    </>

}