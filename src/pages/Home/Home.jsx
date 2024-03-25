import "./Home.css"
import { useState, useEffect } from "react"
import { Header } from "../../common/Header/Header"
import { GetServices } from "../../services/services/getServices"

export const Home = () => {
    const [services, setServices] = useState([])
    const [loadedData, setLoadedData] = useState(false)

    useEffect(() => {
        const getServices = async () => {
            try {
                const fetched = await GetServices();
                setLoadedData(true);
                setServices(fetched.data);
            } catch (error) {
                console.log(error);
            }
        };
    
        if (!loadedData) {
            getServices();
        }
    }, []);

    useEffect(() => {
        console.log(services);
    }, [services]);

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