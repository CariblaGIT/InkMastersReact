import "./PopUpVerifyAction.css";
import Modal from 'react-bootstrap/Modal';
import { FormButton } from "../FormButton/FormButton";
import { useState } from "react";

export const PopUpVerifyAction = ({ entity, onHide, confirm, ...rest }) => {
    const [entityName, setEntityName] = useState(entity)

    const closePopup = () => {
        onHide()
    }

    const doAction = () => {
        confirm()
    }

    return (
        <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                Delete {entityName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="popUpContent">
                    Do you want to delete this {entityName} ?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <FormButton
                    buttonText={"CANCEL"}
                    className={"formButtonDesign"}
                    onClickFunction={closePopup}
                />
                <FormButton
                    buttonText={"YES"}
                    className={"formButtonDesignEdit"}
                    onClickFunction={doAction}
                />
            </Modal.Footer>
        </Modal>
    )
}