import "./AdminPanel.css"
import { useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { Header } from "../../common/Header/Header"

export const AdminPanel = () => {
    const passport = JSON.parse(localStorage.getItem("passport"))
    const [tokenStorage, setTokenStorage] = useState(passport?.token)
    const adminRegexp = /\b(?:admin|super_admin)\b/
    const navigate = useNavigate()

    useEffect(() => {
        if (!tokenStorage || !adminRegexp.test(passport.decoded.roleName)) {
            navigate("/")
        }
    }, [tokenStorage])

    return (
        <>
            <Header/>
            <div className="adminPanelDesign">
                <div className="row">
                    <button className="userSection">
                        USERS
                        <i className="bi bi-people-fill icon"></i>
                    </button>
                    <button className="roleSection">
                        ROLES
                        <i className="bi bi-tags-fill icon"></i>
                    </button>
                </div>
                <div className="row">
                    <button className="serviceSection">
                        SERVICES
                        <i className="bi bi-collection-fill icon"></i>
                    </button>
                    <button className="establishmentSection">
                        ESTABLISHMENTS
                        <i className="bi bi-shop icon"></i>
                    </button>
                </div>
            </div>
        </>
    )
}