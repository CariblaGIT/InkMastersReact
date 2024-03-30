import "./PopUpAppointment.css"
import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal'
import { FormInput } from "../FormInput/FormInput"
import { FormDropdown } from "../FormDropdown/FormDropdown"
import { FormButton } from "../FormButton/FormButton"
import { PostAppointment } from "../../services/appointments/postAppointments"
import { UpdateAppointment } from "../../services/appointments/updateAppointments"
import { FormatDate } from "../../utils/formatDate"

export const PopUpAppointment = (props) => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [actualDate, setActualDate] = useState("");
    const [disableAction, setDisableAction] = useState("disabled");

    const [appointment, setAppointment] = useState({
        date: "",
        tattooer: "",
        service: "",
        establishment: ""
    })

    useEffect(() => {
        const actualDate = getDate()
        setActualDate(actualDate)
        if(props.item){
            const formatDateApp = FormatDate(props.item?.appointmentDate)
            setAppointment({
                service : props.item?.service.serviceName,
                tattooer : props.item?.tattooer.fullname,
                establishment : props.item?.establishment.address,
                date : formatDateApp
            })
        }
    }, [])

    useEffect(() => {
        if(appointment.date !== "" && 
        appointment.tattooer !== "" &&
        appointment.service !== "" &&
        appointment.establishment !== ""){
            setDisableAction("")
        } else {
            setDisableAction("disabled")
        }
    }, [appointment])

    const appointmentInputHandler = (e) => {
        setAppointment((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const getDate = () => {
        const actualDate = new Date()
        let month = actualDate.getMonth() + 1
        let day = actualDate.getDate()
        const year = actualDate.getFullYear()
        if(month < 10){
            month = '0' + month.toString();
        }
        if(day < 10){
            day = '0' + day.toString();
        }
        return year + '-' + month + '-' + day;
    }

    const saveNewAppointment = async () => {
        try {
            const fetched = await PostAppointment(tokenStorage, appointment)
            if(fetched.success === false){
                throw new Error(fetched.error)
            }
            localStorage.setItem("createdAppointment", JSON.stringify(fetched.data));
            props.onHide()
        } catch (error) {
            console.log(error.message)
        }
    }

    const updateAppointment = async () => {
        try {
            const fetched = await UpdateAppointment(tokenStorage, appointment, props.item.id)
            if(fetched.success === false){
                throw new Error(fetched.error)
            }
            localStorage.setItem("updatedAppointment", JSON.stringify(fetched.data));
            props.onHide()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {props.type} appointment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="popUpContent">
                    <FormInput
                        labelText={"Date"}
                        className={"formInputField"}
                        type={"datetime-local"}
                        name={"date"}
                        min={actualDate}
                        value={appointment.date || ""}
                        onChange={e => appointmentInputHandler(e)}
                    />
                    <FormDropdown
                        array={props.services}
                        dataType={"services"}
                        name={"service"}
                        labelText={"services"}
                        selectedOption={appointment.service || ""}
                        onChange={e => appointmentInputHandler(e)}
                    />
                    <FormDropdown
                        array={props.tattooers}
                        dataType={"tattooers"}
                        name={"tattooer"}
                        labelText={"tattooers"}
                        selectedOption={appointment.tattooer || ""}
                        onChange={e => appointmentInputHandler(e)}
                    />
                    <FormDropdown
                        array={props.establishments}
                        dataType={"establishments"}
                        name={"establishment"}
                        labelText={"establishments"}
                        selectedOption={appointment.establishment || ""}
                        onChange={e => appointmentInputHandler(e)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <FormButton
                    buttonText={props.type === "Create" ? "ADD" : "UPDATE"}
                    className={"formButtonDesignEdit"}
                    onClickFunction={props.type === "Create" ? saveNewAppointment : updateAppointment}
                    disabled={props.type === "Create" ? disableAction : ""} 
                />
            </Modal.Footer>
        </Modal>
    )
}