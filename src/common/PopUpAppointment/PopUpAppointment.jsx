import "./PopUpAppointment.css"
import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FormInput } from "../FormInput/FormInput"
import { FormDropdown } from "../FormDropdown/FormDropdown"
import { FormButton } from "../FormButton/FormButton"

export const PopUpAppointment = (props) => {
    const [actualDate, setActualDate] = useState("");
    const [disablePost, setDisablePost] = useState("disabled");

    const [appointment, setAppointment] = useState({
        date: "",
        tattooer: "",
        service: ""
    })

    useEffect(() => {
        const actualDate = getDate()
        setActualDate(actualDate)
    }, [])

    useEffect(() => {
        if(appointment.date !== "" && 
        appointment.tattooer !== "" &&
        appointment.service !== ""){
            setDisablePost("")
        } else {
            setDisablePost("disabled")
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

    const saveNewAppointment = () => {
        console.log("SAVED")
        props.onHide()
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Create appointment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="popUpContent">
                    <FormInput
                        labelText={"Date"}
                        className={"formInputField"}
                        type={"date"}
                        name={"date"}
                        min={actualDate}
                        onChange={e => appointmentInputHandler(e)}
                    />
                    <FormDropdown
                        array={props.services}
                        dataType={"services"}
                        name={"service"}
                        labelText={"services"}
                        onChange={e => appointmentInputHandler(e)}
                    />
                    <FormDropdown
                        array={props.tattooers}
                        dataType={"tattooers"}
                        name={"tattooer"}
                        labelText={"tattooers"}
                        onChange={e => appointmentInputHandler(e)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <FormButton
                    buttonText={"ADD"}
                    className={"formButtonDesignEdit"}
                    onClickFunction={saveNewAppointment}
                    disabled={disablePost}
                />
            </Modal.Footer>
        </Modal>
    )
}