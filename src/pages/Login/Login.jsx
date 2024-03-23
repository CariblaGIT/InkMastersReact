import "./Login.css"
import { useState, useEffect } from "react"
import { FormInput } from "../../common/FormInput/FormInput"
import { FormButton } from "../../common/FormButton/FormButton"
import { Header } from "../../common/Header/Header"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const [success, setSuccess] = useState(false)
    const [msgSuccess, setMsgSuccess] = useState("")

    const loginInputHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const LoginUserCall = async () => {
        try {
            console.log("Inside")
        } catch (error) {
            setMsgSuccess(error.message)
        }
    }

    return (
        <div className="loginDesign">
            <Header/>
            <div className="loginContent">
                <div className="loginHeader">
                    <div className="headerText">LOGIN</div>
                    <div className="headerLine"></div>
                </div>
                <FormInput
                    labelText={"email"}
                    className={"formInputField"}
                    type={"email"}
                    name={"email"}
                    placeholder={"Write your email"}
                    value={credentials.email || ""}
                    onChange={e => loginInputHandler(e)}
                    onBlur={() => {}}
                />
                <FormInput
                    labelText={"password"}
                    className={"formInputField"}
                    type={"password"}
                    name={"password"}
                    placeholder={"Write your password"}
                    value={credentials.password || ""}
                    onChange={e => loginInputHandler(e)}
                    onBlur={() => {}}
                />
                <FormButton
                    buttonText={"LOGIN"}
                    className={"formButtonDesign"}
                    onClickFunction={LoginUserCall}
                    disabled={false}
                />
                <div className={(!success ? "loginError" : "loginSuccess")}>{msgSuccess}</div>
            </div>
        </div>
    )
}