import { useState } from "react"
import Navbar from "../component/navbar-custom"
import { Avatar, Label, Select, TextInput } from "flowbite-react";
import { BsFillTrashFill } from "react-icons/bs"
export default function Upload() {
    const [files, setFiles] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const handleAddImage = (ev) => {
        const newFiles = ev.target.values.map(f => ({ ...f, processed: false, passed: false, sasURI: null }));
        //evaluate

        // Add to current list
        setFiles(data => {
            [...data, files]
        })

        return checkImageValidContent(newFiles);

    }

    const checkImageValidContent = (newFiles) => {
        const uploadPromises = newFiles.map(file => {
            return new Promise((resolve, reject) => {
                uploadFileCheckValid("uploadEndpoint", file)
                    .then(response => {
                        // Resolve the promise if the upload is successful
                        resolve(response);
                    })
                    .catch(error => {
                        // Reject the promise if there's an error
                        reject(error);
                    });
            });
        });

        Promise.all(uploadPromises)
            .then(results => {
                results.forEach(response => {
                    console.log('Upload completed. Server response:', response);
                });
            })
            .catch(error => {
                console.error('Upload error:', error);
            });
    }

    const uploadFileCheckValid = async (file) => {
        console.log(file)
    }

    const generateSASUploadURIs = (validFileNames) => {
        console.log(validFileNames);
        //call api
    }




    return (
        <>
            <Navbar />
            <main className="px-5 max-w-screen-2xl mx-auto">
                <div className="relative flex items-center flex-col overflow-hidden mt-16 pb-12 mb-8 mx-auto w-11/12 rounded-[30px]" style={{
                    backgroundImage: `url(${"/border-download.svg"})`,
                }}>
                    <img src="/photos.png" className="max-w-[300px] mt-12 mb-2" />

                    <h3 className="text-center text-4xl font-[500] my-8 text-[#2c343e]">Drag and drop <br /> to upload, or</h3>
                    <label htmlFor="changeImage" className="cursor-pointer box-border">
                        <button className="text-white pointer-events-none border-[#05a081] bg-[#05a081] cursor-pointer inline-flex justify-center items-center rounded-md h-[50px] w-max font-[500] px-7 ">
                            <span className="">Browse</span>
                        </button>
                        <input type="file" onChange={handleAddImage} id="changeImage" multiple={true} className="hidden overflow-visible" accept="image/jpg, image/jpeg, image/png, video/mp4, video/quicktime, video/x-ms-wmv, video/x-msvideo, video/x-ms-wmv, video/x-flv, video/3gpp" />
                    </label>
                    <span className="absolute top-5 right-8 text-[#bfbfbf]">(0/10)</span>
                </div>
                <ImageProcess />
            </main>
        </>
    )
}

function ImageProcess() {
    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-1 flex flex-col gap-3">
                    <Avatar className="cursor-pointer pb-3" img="https://static.vecteezy.com/system/resources/thumbnails/000/376/259/small/Basic_Elements__28121_29.jpg" size="md" />
                    <Avatar className="cursor-pointer" img="https://avatar.iran.liara.run/public/49" size="lg" />
                    <Avatar className="cursor-pointer" img="https://avatar.iran.liara.run/public/49" bordered size="lg" />

                </div>
                <div className="col-span-11 flex flex-col gap-10 p-10">
                    <div className="max-w-4xl text-center mx-auto">
                        <p className="font-bold text-4xl">Make your photos easy to find and be seen.</p>
                        <p className="text-lg">The way hashtags make your content discoverable in social media, tags will make it easier to find on Pexels. Add some keywords that describe your photo and what is in it.</p>
                    </div>
                    <div>
                        {
                            [1, 2, 3].map((i) => {
                                return <ImageItemCart key={i} />
                            })
                        }
                    </div>

                </div>


            </div>
        </>
    )
}

function ImageItemCart() {
    return <>
        <section className="grid grid-cols-12">

            <div className="col-span-10">
                <div className="py-10 px-14 rounded-2xl bg-gray-100 mb-10">
                    <div className="grid grid-cols-12">
                        <div className="col-span-5">
                            <img
                                className="w-full h-auto rounded-xl"
                                src="https://images.pexels.com/photos/18360882/pexels-photo-18360882/free-photo-of-elizaveta.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
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
                <div className="w-[80px] inline-flex items-center justify-center rounded-full p-5 bg-gray-200 cursor-pointer">
                    <BsFillTrashFill size="36px" className="text-gray-400 hover:text-gray-500" />
                </div>
            </div>

        </section>
    </>
}