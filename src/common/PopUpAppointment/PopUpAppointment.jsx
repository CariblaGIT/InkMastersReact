import "./PopUpAppointment.css"
import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FormInput } from "../FormInput/FormInput"
import { FormDropdownServices } from "../FormDropdownServices/FormDropdownServices"

export const PopUpAppointment = (props) => {
    const [actualDate, setActualDate] = useState("");

    const [appointment, setAppointment] = useState({
        date: "",
        tattooer: "",
        service: ""
    })

    useEffect(() => {
        const actualDate = getDate()
        setActualDate(actualDate)
    }, [])

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
                        onChange={e => console.log("Hey")}
                        onBlur={e => console.log("Hey")}
                    />
                    <FormDropdownServices
                        array={props.services}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}