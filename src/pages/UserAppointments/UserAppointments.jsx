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
import { EntryActionButton } from "../../common/EntryActionButton/EntryActionButton";
import { DeleteAppointment } from "../../services/appointments/deleteAppointments";

export const UserAppointments = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [userAppointments, setUserAppointments] = useState(undefined);
    const [loadedData, setLoadedData] = useState(false);
    const [loadedServicesData, setLoadedServicesData] = useState(false);
    const [loadedTattoersData, setLoadedTattoersData] = useState(false);
    const [loadedEstablishmentsData, setLoadedEstablishmentsData] = useState(false);
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
        console.log(appointments.length);
    }, [appointments])

    useEffect(() => {
        const getUserAppointments = async () => {
            try {
                const fetched = await GetAppointments(tokenStorage);
                setLoadedData(true);
                setUserAppointments(fetched.data);
                if(fetched.data.length > 0){
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
        if(localStorage.getItem("createdAppointment")){
            const newAppointment = JSON.parse(localStorage.getItem("createdAppointment"));
            const newAppointmentDate = new Date(newAppointment.appointmentDate)
            if(newAppointment){
                if(appointments.length > 0){
                    const allAppointments = appointments
                    for(let i = 0; i < allAppointments.length; i++){
                        const dateToCompare = new Date(allAppointments[i].appointmentDate)
                        if(dateToCompare >= newAppointmentDate){
                            allAppointments.splice(i, 0, newAppointment)
                            setAppointments(allAppointments)
                            localStorage.removeItem("createdAppointment")
                            break;
                        } else {
                            allAppointments.push(newAppointment)
                            setAppointments(allAppointments)
                            localStorage.removeItem("createdAppointment")
                            break;
                        }
                    }
                } else {
                    const allAppointments = appointments
                    allAppointments.push(newAppointment)
                    setAppointments(allAppointments)
                    localStorage.removeItem("createdAppointment")
                }   
            }
        }
    }

    const deleteAppointment = async (id, index) => {
        try {
            const fetched = await DeleteAppointment(tokenStorage, id)
            if(fetched.success === false){
                throw new Error(fetched.error)
            }
            setAppointments(appointments.filter((item, i) => i !== index))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="userAppointmentsDesign">
            <Header/>
            <div className="userAppointmentsContent">
                {userAppointments === undefined ? (
                    <>CARGANDO</>
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
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.length === 0 ? (
                                        <tr key={"no-values"}>
                                            <td colSpan={6}>No appointments for this user</td>
                                        </tr>
                                    ) : (
                                        appointments.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                    <td>{dayjs(item.appointmentDate).format("DD/MM/YYYY")}</td>
                                                    <td>{item.establishment.address}</td>
                                                    <td>{item.service.serviceName}</td>
                                                    <td>{item.tattooer.fullname}</td>
                                                    <td className="buttonSection">
                                                        <EntryActionButton
                                                            className={"editButton"}
                                                            buttonIcon={"pencil-square"}
                                                            onClickFunction={() => console.log("Edit")}
                                                        />
                                                        <EntryActionButton
                                                            className={"deleteButton"}
                                                            buttonIcon={"trash"}
                                                            onClickFunction={() => deleteAppointment(item.id, index)}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </>
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