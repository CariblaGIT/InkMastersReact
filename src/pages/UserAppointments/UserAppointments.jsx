import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header"
import { useNavigate } from "react-router-dom"
import "./UserAppointments.css"
import { GetAppointments } from "../../services/appointments/getAppointments"
import { PopUpAppointment } from "../../common/PopUpAppointment/PopUpAppointment"
import { GetServices } from "../../services/services/getServices";

export const UserAppointments = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [userAppointments, setUserAppointments] = useState(undefined);
    const [loadedData, setLoadedData] = useState(false);
    const [loadedDataFromServices, setLoadedDataFromServices] = useState(false);
    const [anyAppointment, setAnyAppointment] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [services, setServices] = useState([]);

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

        const getNewAppointmentsData = async () => {
            try {
                const fetched = await GetServices();
                setLoadedDataFromServices(true);
                setServices(fetched.data);
            } catch (error) {
                console.log(error);
            }
        }

        if (!loadedData) { getUserAppointments() };
        if (!loadedDataFromServices) { getNewAppointmentsData() };
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
            />
        </div>
    )
}