import "./PopUpUser.css"
import { useEffect, useState } from "react"
import Modal from 'react-bootstrap/Modal'
import { FormInput } from "../FormInput/FormInput"
import { FormButton } from "../FormButton/FormButton"
import { RegisterUser } from "../../services/users/userRegister"
import { FormDropdown } from "../FormDropdown/FormDropdown"

export const PopUpUser = (props) => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [disableAction, setDisableAction] = useState("disabled");

    const [user, setUser] = useState({
        fullname: "",
        username: "",
        role: "",
        email: "",
        password: ""
    })

    useEffect(() => {
        if(props.item){
            setUser({
                fullname : props.item?.fullname,
                username : props.item?.username,
                role : props.item?.role,
                email : props.item?.email,
                password : props.item?.password
            })
        }
    }, [])

    useEffect(() => {
        if(user.fullname !== "" && 
        user.username !== "" &&
        user.role !== "" &&
        user.email !== "" &&
        user.password !== ""){
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

    const saveNewUser = async () => {
        try {
            const fetched = await RegisterUser(user)
            if(fetched.success === false){
                throw new Error(fetched.error)
            }
            localStorage.setItem("createdUser", JSON.stringify(fetched.data));
            props.onHide()
        } catch (error) {
            console.log(error.message)
        }
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
                        labelText={"Email"}
                        className={"formInputField"}
                        type={"email"}
                        name={"email"}
                        placeholder={"Write an email"}
                        value={user.email || ""}
                        onChange={e => userInputHandler(e)}
                    />
                    <FormInput
                        labelText={"Password"}
                        className={"formInputField"}
                        type={"password"}
                        name={"password"}
                        placeholder={"Write a password"}
                        value={user.password || ""}
                        onChange={e => userInputHandler(e)}
                    />
                    <FormDropdown
                        array={props.roles}
                        dataType={"roles"}
                        name={"role"}
                        labelText={"role"}
                        selectedOption={user.role || ""}
                        onChange={e => userInputHandler(e)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <FormButton
                    buttonText={props.type === "Create" ? "ADD" : "UPDATE"}
                    className={"formButtonDesignEdit"}
                    onClickFunction={props.type === "Create" ? saveNewUser : () => console.log("Update")}
                    disabled={props.type === "Create" ? disableAction : ""} 
                />
            </Modal.Footer>
        </Modal>
    )
}