import Dropdown from 'react-bootstrap/Dropdown';
import "./Header.css"
import logo from '../../assets/logo.png'

import { useNavigate } from "react-router-dom"
import { HeaderLinks } from "../HeaderLinks/HeaderLinks"

export const Header = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));

    const navigate = useNavigate()

    const handleClickLogo = () => {
        navigate("/");
    }

    const handleProfileClick = () => {
        navigate("/profile");
    }

    const handleAppointmentsClick = () => {
        navigate("/appointments");
    }

    const handleLogoutClick = () => {
        localStorage.removeItem("passport");
        navigate("/");
    }

    return(
        <div className="headerDesign">
            <div className="logo">
                <img src={logo} className="logoImg" onClick={handleClickLogo}></img>
            </div>
            <div className="navigationMenu">
                {passport?.token ? (
                    <>
                        <Dropdown>
                            <Dropdown.Toggle className="profileDropdown" id="dropdown-basic">
                                <img className="avatarImg" src={`https://inkmasters-dev-tmge.2.us-1.fl0.io/public/${passport.decoded.avatar}`}/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="menuDropdown">
                                <Dropdown.Item onClick={handleAppointmentsClick}>Appointments</Dropdown.Item>
                                <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                ) : (
                    <>
                        <HeaderLinks
                            linkText={"Register"}
                            destination={"/register"}
                        />
                        <HeaderLinks
                            linkText={"Login"}
                            destination={"/login"}
                        />
                    </>
                )}
            </div>
        </div>
    )
}