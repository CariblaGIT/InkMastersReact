import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header"
import { useNavigate } from "react-router-dom"
import "./UserAppointments.css"
import { GetAppointments } from "../../services/appointments/getAppointments"
import { PopUpAppointment } from "../../common/PopUpAppointment/PopUpAppointment"
import { GetServices } from "../../services/services/getServices";
import { GetTattoers } from "../../services/users/userGetTattoers";

export const UserAppointments = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [userAppointments, setUserAppointments] = useState(undefined);
    const [loadedData, setLoadedData] = useState(false);
    const [loadedServicesData, setLoadedServicesData] = useState(false);
    const [loadedTattoersData, setLoadedTattoersData] = useState(false);
    const [anyAppointment, setAnyAppointment] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [services, setServices] = useState([]);
    const [tattooers, setTattoers] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/");
        }
    }, [tokenStorage]);

    useEffect(() => {
        const getUserAppointments = async () => {
            try {
                const fetched = await GetAppointments(tokenStorage);
                setLoadedData(true);
                setUserAppointments(fetched.data);
                if(fetched.data.length > 0){
                    setAnyAppointment(false)
                }
            } catch (error) {
                console.log(error);
            }
        }

        const getServicesData = async () => {
            try {
                const fetchedServices = await GetServices();
                setLoadedServicesData(true);
                setServices(fetchedServices.data);
            } catch (error) {
                console.log(error);
            }
        }

        const getTattooersData = async () => {
            try {
                const fetchedTattoers = await GetTattoers(tokenStorage);
                setLoadedTattoersData(true);
                setTattoers(fetchedTattoers.data);
            } catch (error) {
                console.log(error);
            }
        }

        if (!loadedData) { getUserAppointments() };
        if (!loadedServicesData) { getServicesData() };
        if (!loadedTattoersData) { getTattooersData() };
    }, [])

    const popupAddAppointment = () => {
        setModalShow(true)
    }

    return (
        <div className="userAppointmentsDesign">
            <Header/>
            <div className="userAppointmentsContent">
                {userAppointments === undefined ? (
                    <>CARGANDO</>
                ) : (
                    anyAppointment === true ? (
                        <>
                            <div className="buttonsSection">
                                <button className="newAppointmentBtn" onClick={popupAddAppointment}>
                                    New <i className="bi bi-calendar-plus calendarIcon"></i>
                                </button>
                            </div>
                            <div className="appointmentsContent">
                                NO APPOINTMENTS
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="buttonsSection">
                                <button className="newAppointmentBtn" onClick={popupAddAppointment}>
                                    New <i className="bi bi-calendar-plus calendarIcon"></i>
                                </button>
                            </div>
                            <div className="appointmentsContent">
                                APPOINTMENTS
                            </div>
                        </>
                    )
                )}
            </div>
            <PopUpAppointment
                show={modalShow}
                onHide={() => setModalShow(false)}
                services={services}
                tattooers={tattooers}
            />
        </div>
    )
}