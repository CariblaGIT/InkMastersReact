import "./Register.css"
import { useState, useEffect } from "react"
import { Header } from "../../common/Header/Header"
import { FormInput } from "../../common/FormInput/FormInput"
import { FormButton } from "../../common/FormButton/FormButton"
import { validateRegisterData } from "../../utils/userDataValidations"
import { RegisterUser } from "../../services/users/userRegister"
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullname: "",
        username: "",
        email: "",
        password: ""
    })

    const [userError, setUserError] = useState({
        fullnameError: "",
        usernameError: "",
        emailError: "",
        passwordError: ""
    })

    const [notAllowToRegister, setNotAllowToRegister] = useState(true)
    const [success, setSuccess] = useState(false)
    const [msgSuccess, setMsgSuccess] = useState("")

    useEffect(() => {
        if(user.fullname !== "" && user.username !== "" && user.email !== "" && user.password !== ""){
            if((userError.fullnameError === undefined) && 
            (userError.usernameError === undefined) && 
            (userError.emailError === undefined) && 
            (userError.passwordError === undefined)){
                setNotAllowToRegister(false)
            } else {
                setNotAllowToRegister(true)
            }
        } else {
            setNotAllowToRegister(true)
        }
    }, [userError])

    const registerInputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const checkInputError = (e) => {
        const error = validateRegisterData(e.target.name, e.target.value);
    
        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }));
    };

    const RegisterUserCall = async () => {
        try {
            const fetched = await RegisterUser(user)
            if(fetched.success === false){
                throw new Error(fetched.error)
            }
            setSuccess(true)
            setMsgSuccess(fetched.message + "\n" + "Redirecting to Login")
            setTimeout(() => {
                navigate("/login");
              }, 2000);
        } catch (error) {
            setMsgSuccess(error.message)
        }
    }

    return (
        <div className="registerDesign">
            <Header/>
            <div className="registerContent">
                <div className="registerHeader">
                    <div className="headerText">SIGN UP</div>
                    <div className="headerLine"></div>
                </div>
                <FormInput
                    labelText={"fullname"}
                    className={"formInputField"}
                    type={"text"}
                    name={"fullname"}
                    placeholder={"Write your entire name"}
                    value={user.fullname || ""}
                    onChange={e => registerInputHandler(e)}
                    onBlur={e => checkInputError(e)}
                />
                <div className="inputError">{userError.fullnameError}</div>
                <FormInput
                    labelText={"username"}
                    className={"formInputField"}
                    type={"text"}
                    name={"username"}
                    placeholder={"Write a username"}
                    value={user.username || ""}
                    onChange={e => registerInputHandler(e)}
                    onBlur={e => checkInputError(e)}
                />
                <div className="inputError">{userError.usernameError}</div>
                <FormInput
                    labelText={"email"}
                    className={"formInputField"}
                    type={"email"}
                    name={"email"}
                    placeholder={"Write an email"}
                    value={user.email || ""}
                    onChange={e => registerInputHandler(e)}
                    onBlur={e => checkInputError(e)}
                />
                <div className="inputError">{userError.emailError}</div>
                <FormInput
                    labelText={"password"}
                    className={"formInputField"}
                    type={"password"}
                    name={"password"}
                    placeholder={"Write a password"}
                    value={user.password || ""}
                    onChange={e => registerInputHandler(e)}
                    onBlur={e => checkInputError(e)}
                />
                <div className="inputError">{userError.passwordError}</div>
                <FormButton
                    buttonText={"REGISTER"}
                    className={"formButtonDesign"}
                    onClickFunction={RegisterUserCall}
                    disabled={notAllowToRegister}
                />
                <div className={(!success ? "registerError" : "registerSuccess")}>{msgSuccess}</div>
            </div>
        </div>
    )
}