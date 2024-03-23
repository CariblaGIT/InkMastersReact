import { Header } from "../../common/Header/Header"
import "./Home.css"

export const Home = () => {
    return (
        <div className="homeDesign">
            <Header/>
            <div className="homeContent">
                <div className="homeTitle">
                    <div className="homeHeader">
                        Welcome to InkMasters
                    </div>
                    <div className="homeSubHeader">
                        Your desired place to make your tatoos and other cosmetics
                    </div>
                </div>
                <div className="homeServices">
                    Here will go the services
                </div>
            </div>
        </div>
    )
}