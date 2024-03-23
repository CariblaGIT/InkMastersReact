import "./Register.css"
import { useState } from "react"
import { Header } from "../../common/Header/Header"
import { FormInput } from "../../common/FormInput/FormInput"
import { FormButton } from "../../common/FormButton/FormButton"

export const Register = () => {
    const [user, setUser] = useState({
        fullname: "",
        username: "",
        email: "",
        password: ""
    })

    const registerInputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    return (
        <div className="registerDesign">
            <Header/>
            <div className="registerContent">
                <FormInput
                    labelText={"fullname"}
                    className={"formInputField"}
                    type={"text"}
                    name={"fullname"}
                    placeholder={"Write your entire name"}
                    value={user.fullname || ""}
                    onChange={e => registerInputHandler(e)}
                    onBlur={() => console.log("World")}
                />
                <FormInput
                    labelText={"username"}
                    className={"formInputField"}
                    type={"text"}
                    name={"username"}
                    placeholder={"Write a username"}
                    value={user.username || ""}
                    onChange={e => registerInputHandler(e)}
                    onBlur={() => console.log("World")}
                />
                <FormInput
                    labelText={"email"}
                    className={"formInputField"}
                    type={"email"}
                    name={"email"}
                    placeholder={"Write an email"}
                    value={user.email || ""}
                    onChange={e => registerInputHandler(e)}
                    onBlur={() => console.log("World")}
                />
                <FormInput
                    labelText={"password"}
                    className={"formInputField"}
                    type={"password"}
                    name={"password"}
                    placeholder={"Write a password"}
                    value={user.password || ""}
                    onChange={e => registerInputHandler(e)}
                    onBlur={() => console.log("World")}
                />
                <FormButton
                    buttonText={"REGISTER"}
                />
            </div>
        </div>
    )
}