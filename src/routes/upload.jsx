import { useEffect, useState } from "react"
import Navbar from "../component/navbar-custom"
import { Avatar, Label, Select, TextInput } from "flowbite-react";
import { BsFillTrashFill, BsCloudUpload } from "react-icons/bs"
import toast from "react-hot-toast";
import { useValidateImageAdultMutation } from "../redux/services/imageValidation";
import LoadingOverlay from "../component/loadingOverlay";
import { useGenerateSASURIMutation } from "../redux/services/imageSASGenerate";
import { usePutToBlobStorageMutation } from "../redux/services/uploadUsingSASToken";

const convertByteToMB = (b) => {
    return b / (1024 ** 2)
}
const allow_files = "image/jpg, image/jpeg, image/png, video/mp4, video/quicktime, video/x-ms-wmv, video/x-msvideo, video/x-ms-wmv, video/x-flv, video/3gpp";
export default function Upload() {
    const [files, setFiles] = useState([]);
    const [fileTempURIs, setFileTempURIs] = useState([]);
    const [validateImageAdult, { isLoading: isLoadingValidatingImageAdult, isProcessing: isProcessingValidatingImageAdult }] = useValidateImageAdultMutation()

    const handleAddImage = (ev) => {
        const processingFiles = []
        if (ev.target.files.length > 10) {
            return toast.error("Maximun of 10 files each upload")
        }
        for (const file of ev.target.files) {
            if (!allow_files.includes(file.type)) {
                toast.error(`File extention of ${file.name} is not allowed`, { duration: 3000 });
                continue;
            }
            if (convertByteToMB(file.size) < 0) {
                toast.error(`File ${file.name} must be greaer than 1 MB`, { duration: 3000 });
                continue;
            }

            if (files.length <= 10) {
                processingFiles.push(file)
            }
        }

        processingFiles.length >= 0 && files.length <= 10 && checkImageValidContent(processingFiles)
    }

    const checkImageValidContent = (newFiles) => {
        const uploadFileValidationPromises = Array.from(newFiles).map((file) => validateImageAdult(file).unwrap().then(({ adult }) => {
            if (adult.isAdultContent || adult.isGoryContent || adult.RacyContent) {
                toast.error(`File ${file.name} contains adult or gory or racy content restriction`, { duration: 5000 });
            } else {
                setFiles(prev => ([...prev, file]))
                setFileTempURIs(prev => ([...prev, URL.createObjectURL(file)]))
            }
        }).catch(err => {
            console.log({ err })
            toast.error(`Fail to validate file ${file.name}. Please try again`, { duration: 5000 })
        }));
        Promise.all(uploadFileValidationPromises)
    }
    useEffect(() => {
        console.log({ files })
    }, [files.lenght, files])

    const handleDelete = (key) => {
        setFiles(prev => prev.filter((_, index) => index !== key))
        setFileTempURIs(prev => prev.filter((_, index) => index !== key))
    }

    return (
        <>
            <LoadingOverlay loading={isProcessingValidatingImageAdult || isLoadingValidatingImageAdult}>
                <Navbar />
                <main className="px-5 max-w-screen-2xl mx-auto">
                    {
                        files.length === 0 ?
                            <div className="relative flex items-center flex-col overflow-hidden mt-16 pb-12 mb-8 mx-auto w-11/12 rounded-[30px]" style={{
                                backgroundImage: `url(${"/border-download.svg"})`,
                            }}>
                                <img src="/photos.png" className="max-w-[300px] mt-12 mb-2" />

                                <h3 className="text-center text-4xl font-[500] my-8 text-[#2c343e]">Drag and drop <br /> to upload, or</h3>
                                <label htmlFor="changeImage" className="cursor-pointer box-border">
                                    <button className="text-white pointer-events-none border-[#05a081] bg-[#05a081] cursor-pointer inline-flex justify-center items-center rounded-md h-[50px] w-max font-[500] px-7 ">
                                        <span className="">Browse</span>
                                    </button>
                                    <input type="file" onChange={handleAddImage} id="changeImage" multiple={true} className="hidden overflow-visible" accept={allow_files} />
                                </label>
                                <span className="absolute top-5 right-8 text-[#bfbfbf]">(0/10)</span>
                            </div>
                            :
                            <ImageProcess files={fileTempURIs} handleDelete={handleDelete} handleAddImage={handleAddImage} />
                    }
                </main>
                {
                    files.length > 0 && <SubmitFormBar files={files} setFiles={setFiles} />
                }

            </LoadingOverlay>
        </>
    )
}

function SubmitFormBar({ files, setFiles }) {
    const [generateSASURI, { isLoading: isLoadingGenerate }] = useGenerateSASURIMutation();
    const [putToBlobStorage, { isLoading: isLoadingPutBlob }] = usePutToBlobStorageMutation()


    const handleSubmit = () => {

        const uploadFileBlobPromises = Array.from(files).map(file => generateSASURI(file.name).unwrap().then(({ putURL: { url: SASURI } }) => {
            putToBlobStorage({ file, SASURI }).unwrap().then(() => {
                console.log({ SASURI })
                toast.success(`File ${file.name} uploaded successfully`)
            }).catch(err => {
                console.log({ err })
                toast.error(`File ${file.name} uploaded failed`)

            })
        }).catch(err => { console.log({ err }) }))

        Promise.all(uploadFileBlobPromises)
    }
    return (
        <LoadingOverlay loading={isLoadingGenerate || isLoadingPutBlob}>
            <div className="submit-bar flex items-center px-32">
                <div className="submit-bar-content text-[#05a081]">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                            <BsCloudUpload className="text-4xl" />
                            <span className="text-2xl font-bold">{files.length} Files ready to upload</span>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="text-white border-[#05a081] bg-[#05a081] cursor-pointer inline-flex justify-center items-center rounded-md h-[50px] w-max font-[500] px-7 ">
                            Submit your content
                        </button>
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    )
}

function ImageProcess({ files, handleDelete, handleAddImage }) {

    return (
        <>
            <div className="grid grid-cols-12 mt-10">
                <div className="col-span-1 flex flex-col gap-3">
                    <label htmlFor="changeImage" className="cursor-pointer box-border">
                        <Avatar className="cursor-pointer pb-3" img="https://static.vecteezy.com/system/resources/thumbnails/000/376/259/small/Basic_Elements__28121_29.jpg" size="md" />
                        <input type="file" onChange={handleAddImage} id="changeImage" multiple={true} className="hidden overflow-visible" accept={allow_files} />
                    </label>


                    {
                        files.map((f, index) => (<a href={`#file_${index}`} key={f}><Avatar className="cursor-pointer" img={f} size="lg" /></a>))
                    }


                </div>
                <div className="col-span-11 flex flex-col gap-10 p-10">
                    <div className="max-w-4xl text-center mx-auto">
                        <p className="font-bold text-4xl">Make your photos easy to find and be seen.</p>
                        <p className="text-lg">The way hashtags make your content discoverable in social media, tags will make it easier to find on Pexels. Add some keywords that describe your photo and what is in it.</p>
                    </div>
                    <div>
                        {
                            files.map((f, index) => {
                                return <ImageItemCart key={index} index={index} file={f} handleDelete={handleDelete} />
                            })
                        }
                    </div>

                </div>


            </div>
        </>
    )
}

function ImageItemCart({ index, file, handleDelete }) {
    return <>
        <section className="grid grid-cols-12" id={`file_${index}`}>

            <div className="col-span-10">
                <div className="py-10 px-14 rounded-2xl bg-gray-100 mb-10">
                    <div className="grid grid-cols-12">
                        <div className="col-span-5">
                            <img
                                className="w-full h-auto rounded-xl"
                                src={file} />
                        </div>

                        <div className="col-span-7 flex gap-5 flex-col justify-center">
                            <div className="ml-12 mr-0">
                                <div className="mb-2 block">
                                    <Label htmlFor="base" value="Title (Optional)" />
                                </div>
                                <TextInput id="base" type="text" sizing="lg" placeholder="Enter title" />
                            </div>
                            <div className="ml-12 mr-0">
                                <div className="mb-2 block">
                                    <Label htmlFor="base" value="Tags (Optional)" />
                                </div>
                                <TextInput id="base" type="text" sizing="lg" placeholder="Enter tags" />
                            </div>
                            <div className="ml-12 mr-0">
                                <div className="mb-2 block">
                                    <Label htmlFor="base" value="Location (Optional)" />
                                </div>
                                <TextInput id="base" type="text" sizing="lg" placeholder="Enter location" />
                            </div>
                            <div className="ml-12 mr-0">
                                <div className="mb-2 block">
                                    <Label htmlFor="base" value="Challenges (Optional)" />
                                </div>
                                <Select id="countries" sizing="lg" >
                                </Select>
                            </div>
                        </div>
                    </div >

                </div>
            </div>
            <div className="col-span-2 flex justify-center items-center" >
                <div className="w-[80px] inline-flex items-center justify-center rounded-full p-5 bg-gray-200 cursor-pointer" onClick={() => handleDelete(index)}>
                    <BsFillTrashFill size="36px" className="text-gray-400 hover:text-gray-500" />
                </div>
            </div>

        </section>
    </>
}