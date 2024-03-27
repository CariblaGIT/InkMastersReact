import { useEffect, useState } from "react";
import { Header } from "../../common/Header/Header"
import { useNavigate } from "react-router-dom"
import "./UserAppointments.css"
import { GetAppointments } from "../../services/appointments/getAppointments";

export const UserAppointments = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [userAppointments, setUserAppointments] = useState(undefined);
    const [loadedData, setLoadedData] = useState(false);
    const [anyAppointment, setAnyAppointment] = useState(true);

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

        if (!loadedData) {
            getUserAppointments();
        }

        console.log(userAppointments)
    }, [userAppointments])

    return (
        <div className="userAppointmentsDesign">
            <Header/>
            <div className="userAppointmentsContent">
                {userAppointments === undefined ? (
                    <>CARGANDO</>
                ) : (
                    anyAppointment === true ? (
                        <>NO APPOINTMENTS</>
                    ) : (
                        <>APPOINTMENTS</>
                    )
                )}
            </div>
        </div>
    )
}