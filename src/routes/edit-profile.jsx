import { Avatar, Button, Label, TextInput, Textarea } from "flowbite-react"
import Navbar from "../component/navbar-custom"
import { useSelector } from "react-redux"


export default function EditProfile() {
    const user = useSelector(state => state.user)

    return (
        <>
            <Navbar />
            <main className="max-w-screen-lg mx-auto px-20 my-10">
                <h1 className="text-center text-5xl font-bold mb-10">Profile settings</h1>
                <div className="flex justify-start mb-10 gap-10 items-center">
                    <Avatar img="https://avatar.iran.liara.run/public/49" rounded bordered size="xl" />
                    <Button className="bg-[#05a081] h-14 p-2">Change Avatar</Button>
                </div>
                <form className="grid grid-cols-2 gap-10">
                    <div className="flex flex-col gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="firstname" value="First name" />
                            </div>
                            <TextInput id="firstname" type="text" placeholder="John" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Email" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="name@flowbite.com" required value={user?.email} />
                        </div>
                        <div>
                            <div className="mt-2 block">
                                <Label value="Password" />
                            </div>
                            <Button className="px-2 py-1 bg-slate-400">Change Password</Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="lastname" value="Last name" />
                            </div>
                            <TextInput id="lastname" type="text" placeholder="Wick" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Paypal email for donations" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
                        </div>

                    </div>


                    <div className="col-span-2">
                        <div className="mb-2 block">
                            <Label htmlFor="comment" value="Short bio" />
                        </div>
                        <Textarea id="comment" placeholder="Leave a comment..." required rows={4} maxLength={130} />
                    </div>

                    <div className="flex flex-col gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Location" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Twitter" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="" required />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Youtube" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="" required />
                        </div>

                    </div>
                    <div className="flex flex-col gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Website" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Instagram" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Tiktok" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="" required />
                        </div>

                    </div>


                </form>
                <Button className="bg-[#05a081] h-14 py-2 px-4 mx-auto mt-10">Save Profile</Button>
            </main >
        </>

    )
}


