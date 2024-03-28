import "./HeaderLinks.css"

import { useNavigate } from "react-router-dom"

export const HeaderLinks = ({ linkText , destination }) => {
    const navigate = useNavigate()

    return(
        <div className="navigatorDesign" onClick={() => navigate(destination)}>
            {linkText}
        </div>
    )
}