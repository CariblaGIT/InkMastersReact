import "./Home.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from "react";
import { Header } from "../../common/Header/Header";
import { GetServices } from "../../services/apiCalls";
import Carousel from 'react-bootstrap/Carousel';

export const Home = () => {
    const [services, setServices] = useState([])
    const [loadedData, setLoadedData] = useState(false)

    useEffect(() => {
        const getServices = async () => {
            try {
                const fetched = await GetServices();
                setLoadedData(true)
                setServices(fetched.data)
            } catch (error) {
                console.log(error)
            }
        }
    
        if (!loadedData) { getServices() }
    }, [])

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
                        {!loadedData ? (
                            <div>CARGANDO</div>
                        ) : (
                            <Carousel>
                                {services.map((item) => {
                                    const url = `../../../public/services/${item.id}.jpg`
                                    return (
                                        <Carousel.Item key={item.id}>
                                        <img src={url} className="serviceImg"/>
                                        <Carousel.Caption>
                                            <h3>{item.serviceName}</h3>
                                            <p>{item.description}</p>
                                        </Carousel.Caption>
                                        </Carousel.Item>
                                    );
                                })}
                            </Carousel> 
                        )}
                </div>
            </div>
        </div>
    )
}