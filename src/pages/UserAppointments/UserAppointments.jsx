import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Header } from "../../common/Header/Header"
import { useNavigate } from "react-router-dom"
import "./UserAppointments.css"
import { GetAppointments } from "../../services/appointments/getAppointments"
import { PopUpAppointment } from "../../common/PopUpAppointment/PopUpAppointment"
import { GetServices } from "../../services/services/getServices";
import { GetTattoers } from "../../services/users/userGetTattoers";
import { GetEstablishments } from "../../services/establishments/getEstablishments";
import { Table } from "react-bootstrap";

export const UserAppointments = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [userAppointments, setUserAppointments] = useState(undefined);
    const [loadedData, setLoadedData] = useState(false);
    const [loadedServicesData, setLoadedServicesData] = useState(false);
    const [loadedTattoersData, setLoadedTattoersData] = useState(false);
    const [loadedEstablishmentsData, setLoadedEstablishmentsData] = useState(false);
    const [anyAppointment, setAnyAppointment] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [services, setServices] = useState([]);
    const [tattooers, setTattoers] = useState([]);
    const [establishments, setEstablishments] = useState([]);
    const [appointments, setAppointments] = useState([]);

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
                    setAppointments(fetched.data)
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

        const getEstablishmentsData = async () => {
            try {
                const fetchedServices = await GetEstablishments();
                setLoadedEstablishmentsData(true);
                setEstablishments(fetchedServices.data);
            } catch (error) {
                console.log(error);
            }
        }

        if (!loadedData) { getUserAppointments() };
        if (!loadedServicesData) { getServicesData() };
        if (!loadedTattoersData) { getTattooersData() };
        if (!loadedEstablishmentsData) { getEstablishmentsData() };
    }, [])

    const popupAddAppointment = () => {
        setModalShow(true)
    }

    const closingAddAppointment = () => {
        setModalShow(false)
        const newAppointment = JSON.parse(localStorage.getItem("createdAppointment"));
        if(newAppointment){
            console.log(newAppointment)
        }
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
                                <Table responsive striped variant="dark">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Date</th>
                                            <th>Establishment</th>
                                            <th>Service</th>
                                            <th>Tattooer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                    <td>{dayjs(item.appointmentDate).format("DD/MM/YYYY")}</td>
                                                    <td>{item.establishment.address}</td>
                                                    <td>{item.service.serviceName}</td>
                                                    <td>{item.tattooer.fullname}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    )
                )}
            </div>
            <PopUpAppointment
                show={modalShow}
                onHide={closingAddAppointment}
                services={services}
                tattooers={tattooers}
                establishments={establishments}
            />
        </div>
    )
}