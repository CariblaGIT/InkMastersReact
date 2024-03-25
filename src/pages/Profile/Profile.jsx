import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header"
import { useNavigate } from "react-router-dom"
import "./Profile.css"

export const Profile = () => {
    const datosUser = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(datosUser?.token);

    const navigate = useNavigate()

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/");
        }
    }, [tokenStorage]);

    return (
        <div className="profileDesign">
            <Header/>
            <div className="profileContent">
                Im the view for profile
            </div>
        </div>
    )
}