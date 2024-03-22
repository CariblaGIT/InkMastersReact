import "./Header.css"
import logo from '../../assets/logo.png'

export const Header = () => {
    return(
        <div className="headerDesign">
            <div className="logo">
                <img src={logo} className="logoImg"></img>
            </div>
            <div className="navigationMenu">
                Here I will put links to all places of app
            </div>
        </div>
    )
}