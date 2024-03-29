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
                Soy el admin panel
            </div>
        </>
    )
}