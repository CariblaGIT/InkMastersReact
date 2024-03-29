import "./PopUpUser.css"
import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal'
import { FormInput } from "../FormInput/FormInput"
import { FormButton } from "../FormButton/FormButton"

export const PopUpUser = (props) => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [disableAction, setDisableAction] = useState("disabled");

    const [user, setUser] = useState({
        fullname: "",
        username: "",
        avatar: "",
        email: ""
    })

    useEffect(() => {
        if(props.item){
            setUser({
                fullname : props.item?.fullname,
                username : props.item?.username,
                avatar : props.item?.avatar,
                email : props.item?.email
            })
        } else {
            setUser({
                fullname : "",
                username : "",
                avatar : "default_avatar.png",
                email : ""
            })
        }
    }, [])

    useEffect(() => {
        if(user.fullname !== "" && 
        user.username !== "" &&
        user.avatar !== "" &&
        user.email !== ""){
            setDisableAction("")
        } else {
            setDisableAction("disabled")
        }
    }, [user])

    const userInputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {props.type} user
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="popUpContent">
                    <FormInput
                        labelText={"Fullname"}
                        className={"formInputField"}
                        type={"text"}
                        name={"fullname"}
                        placeholder={"Write a fullname"}
                        value={user.fullname || ""}
                        onChange={e => userInputHandler(e)}
                    />
                    <FormInput
                        labelText={"Username"}
                        className={"formInputField"}
                        type={"text"}
                        name={"username"}
                        placeholder={"Write an username"}
                        value={user.username || ""}
                        onChange={e => userInputHandler(e)}
                    />
                    <FormInput
                        labelText={"Avatar"}
                        className={"formInputField"}
                        type={"text"}
                        name={"avatar"}
                        disabled={"disabled"}
                        value={user.avatar || ""}
                        onChange={e => userInputHandler(e)}
                    />
                    <FormInput
                        labelText={"Email"}
                        className={"formInputField"}
                        type={"email"}
                        name={"email"}
                        placeholder={"Write an email"}
                        value={user.email || ""}
                        onChange={e => userInputHandler(e)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <FormButton
                    buttonText={props.type === "Create" ? "ADD" : "UPDATE"}
                    className={"formButtonDesignEdit"}
                    onClickFunction={props.type === "Create" ? () => console.log("Create") : () => console.log("Update")}
                    disabled={props.type === "Create" ? disableAction : ""} 
                />
            </Modal.Footer>
        </Modal>
    )
}