import "./Header.css"
import logo from '../../assets/logo.png'

import { useNavigate } from "react-router-dom"
import { HeaderLinks } from "../HeaderLinks/HeaderLinks"

export const Header = () => {

    const navigate = useNavigate();

    const handleClickLogo = () => {
        navigate("/");
    }

    return(
        <div className="headerDesign">
            <div className="logo">
                <img src={logo} className="logoImg" onClick={handleClickLogo}></img>
            </div>
            <div className="navigationMenu">
                <HeaderLinks
                    linkText={"Register"}
                    destination={"/register"}
                />
                <HeaderLinks
                    linkText={"Login"}
                    destination={"/login"}
                />
            </div>
        </div>
    )
}