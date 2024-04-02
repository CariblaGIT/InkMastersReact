import "./Login.css";
import { useState, useEffect } from "react";
import { FormInput } from "../../common/FormInput/FormInput";
import { FormButton } from "../../common/FormButton/FormButton";
import { Header } from "../../common/Header/Header";
import { LoginUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

export const Login = () => {
    const navigate = useNavigate()
    const adminRegexp = /\b(?:admin|super_admin)\b/
    const [success, setSuccess] = useState(false)
    const [notAllowToLogin, setNotAllowToLogin] = useState(true)
    const [msgSuccess, setMsgSuccess] = useState("")

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        if(credentials.email !== "" && credentials.password !== ""){
            setNotAllowToLogin(false)
        } else {
            setNotAllowToLogin(true)
        }
    }, [credentials])

    const loginInputHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const LoginUserCall = async () => {
        try {
            const fetched = await LoginUser(credentials)
            if(fetched.success === false){
                throw new Error("Invalid credentials")
            }
            setSuccess(true)

            const decodedToken = decodeToken(fetched.token)

            const passport = {
                token: fetched.token,
                decoded: decodedToken,
            };

            localStorage.setItem("passport", JSON.stringify(passport))
            
            if(adminRegexp.test(passport.decoded.roleName)){
                setMsgSuccess(fetched.message + "\n" + "Redirecting to admin panel")
                setTimeout(() => {
                    navigate("/admin-panel")
                }, 2000)
            } else {
                setMsgSuccess(fetched.message + "\n" + "Redirecting to your appointments")
                setTimeout(() => {
                    navigate("/appointments")
                }, 2000)
            }
        } catch (error) {
            setSuccess(false)
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
                    disabled={""}
                    value={credentials.email || ""}
                    onChange={e => loginInputHandler(e)}
                />
                <FormInput
                    labelText={"password"}
                    className={"formInputField"}
                    type={"password"}
                    name={"password"}
                    placeholder={"Write your password"}
                    disabled={""}
                    value={credentials.password || ""}
                    onChange={e => loginInputHandler(e)}
                />
                <FormButton
                    buttonText={"LOGIN"}
                    className={"formButtonDesign"}
                    onClickFunction={LoginUserCall}
                    disabled={notAllowToLogin}
                />
                <div className={(!success ? "loginError" : "loginSuccess")}>{msgSuccess}</div>
            </div>
        </div>
    )
}