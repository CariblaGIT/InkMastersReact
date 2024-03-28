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
import { PopUpVerifyAction } from "../../common/PopUpVerifyAction/PopUpVerifyAction";

export const UserAppointments = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [userAppointments, setUserAppointments] = useState(undefined);
    const [loadedData, setLoadedData] = useState(false);
    const [loadedServicesData, setLoadedServicesData] = useState(false);
    const [loadedTattoersData, setLoadedTattoersData] = useState(false);
    const [loadedEstablishmentsData, setLoadedEstablishmentsData] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [verificationModal, setVerificationModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [services, setServices] = useState([]);
    const [tattooers, setTattoers] = useState([]);
    const [establishments, setEstablishments] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [idAppInteracted, setIdAppInteracted] = useState(0);
    const [indexAppToDelete, setIndexAppToDelete] = useState(0);
    const [itemToUpdate, setItemToUpdate] = useState({});

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
                    let pushed = false
                    for(let i = 0; i < allAppointments.length; i++){
                        const dateToCompare = new Date(allAppointments[i].appointmentDate)
                        if(dateToCompare >= newAppointmentDate){
                            allAppointments.splice(i, 0, newAppointment)
                            setAppointments(allAppointments)
                            localStorage.removeItem("createdAppointment")
                            pushed = true
                            break;
                        }
                    }
                    if(!pushed){
                        allAppointments.push(newAppointment)
                        setAppointments(allAppointments)
                        localStorage.removeItem("createdAppointment")
                        pushed = true
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

    const closingVerifyDelete = () => {
        setIdAppInteracted(0)
        setIndexAppToDelete(0)
        setVerificationModal(false)
    }

    const verifyDeleteAction = (id, index) => {
        setIdAppInteracted(id)
        setIndexAppToDelete(index)
        setVerificationModal(true)
    }

    const deleteAppointment = async () => {
        if(idAppInteracted !== 0){
            try {
                const fetched = await DeleteAppointment(tokenStorage, idAppInteracted)
                if(fetched.success === false){
                    throw new Error(fetched.error)
                }
                setAppointments(appointments.filter((item, i) => i !== indexAppToDelete))
                setIdAppInteracted(0)
                setIndexAppToDelete(0)
                setVerificationModal(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const activateUpdateAction = (item, id) => {
        setItemToUpdate(item)
        setIdAppInteracted(id)
        setUpdateModal(true)
    }

    const closingUpdateAppointment = () => {
        setUpdateModal(false)
        if(localStorage.getItem("updatedAppointment")){
            const appointmentUpdated = JSON.parse(localStorage.getItem("updatedAppointment"))
            appointments.map((item, index) => {
                if(item === itemToUpdate){
                    appointments[index] = appointmentUpdated
                }
            })
            localStorage.removeItem("updatedAppointment")
        }
    }

    return (
        <div className="userAppointmentsDesign">
            <Header/>
            <div className="userAppointmentsContent">
                {userAppointments === undefined ? (
                    <>LOADING</>
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
                                                            onClickFunction={() => activateUpdateAction(item, index)}
                                                        />
                                                        <EntryActionButton
                                                            className={"deleteButton"}
                                                            buttonIcon={"trash"}
                                                            onClickFunction={() => verifyDeleteAction(item.id, index)}
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
            {modalShow && (
                <PopUpAppointment
                    show={modalShow}
                    onHide={closingAddAppointment}
                    services={services}
                    tattooers={tattooers}
                    establishments={establishments}
                    type={"Create"}
                />
            )}
            {verificationModal && (
                <PopUpVerifyAction
                    show={verificationModal}
                    onHide={closingVerifyDelete}
                    confirm={deleteAppointment}
                    entity={"appointment"}
                />
            )}
            {updateModal && (
                <PopUpAppointment
                    show={updateModal}
                    onHide={closingUpdateAppointment}
                    services={services}
                    tattooers={tattooers}
                    establishments={establishments}
                    item={itemToUpdate}
                    type={"Update"}
                />
            )}
        </div>
    )
}