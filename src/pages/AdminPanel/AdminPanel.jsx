import "./AdminPanel.css"
import { useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { Header } from "../../common/Header/Header"

export const AdminPanel = () => {
    const passport = JSON.parse(localStorage.getItem("passport"))
    const [tokenStorage, setTokenStorage] = useState(passport?.token)
    const navigate = useNavigate()

    useEffect(() => {
        if (!tokenStorage || !(passport.decoded.roleName).includes("admin")) {
            navigate("/")
        }
    }, [tokenStorage])

    const handleUsersPanelButton = () => {
        navigate("/admin-panel/users")
    }

    const handleEstablishmentsPanelButton = () => {
        navigate("/admin-panel/establishments")
    }

    const handleServicesPanelButton = () => {
        navigate("/admin-panel/services")
    }

    const handleRolesPanelButton = () => {
        navigate("/admin-panel/roles")
    }

    return (
        <>
            <Header/>
            <div className="adminPanelDesign">
                <div className="row">
                    <button className="userSection" onClick={handleUsersPanelButton}>
                        USERS
                        <i className="bi bi-people-fill icon"></i>
                    </button>
                    <button className="roleSection" onClick={handleRolesPanelButton}>
                        ROLES
                        <i className="bi bi-tags-fill icon"></i>
                    </button>
                </div>
                <div className="row">
                    <button className="serviceSection" onClick={handleServicesPanelButton}>
                        SERVICES
                        <i className="bi bi-collection-fill icon"></i>
                    </button>
                    <button className="establishmentSection" onClick={handleEstablishmentsPanelButton}>
                        ESTABLISHMENTS
                        <i className="bi bi-shop icon"></i>
                    </button>
                </div>
            </div>
        </>
    )
}