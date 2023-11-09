import React, { useEffect } from "react"
import { useActivateAccountMutation } from "../redux/services/authService"
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function Activate() {
    const navigate = useNavigate()
    const query = useQuery();
    const [activateAccount] = useActivateAccountMutation()
    useEffect(() => {
        query.get("token") && activateAccount(query.get("token")).unwrap().then(() => {
            toast.success("Account activated successfully. Try to login")
            navigate("/login")
        }).catch(err => {
            console.log({ err })
            toast.error("Failed to validate. Try to register again")
            navigate("/register")
        })
    }, [])
    return (
        <div>activate</div>
    )
}
