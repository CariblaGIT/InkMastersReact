import { useEffect, useState } from "react"
import { Header } from "../../common/Header/Header"
import { useNavigate } from "react-router-dom"
import "./Profile.css"
import { GetProfile } from "../../services/users/userGetProfile"
import { FormInput } from "../../common/FormInput/FormInput"
import { publicServer } from "../../services/config"
import { FormButton } from "../../common/FormButton/FormButton"
import { validateRegisterData } from "../../utils/userDataValidations"

export const Profile = () => {
    const passport = JSON.parse(localStorage.getItem("passport"))
    const navigate = useNavigate()

    const [tokenStorage, setTokenStorage] = useState(passport?.token)
    const [loadedData, setLoadedData] = useState(false)
    const [write, setWrite] = useState("disabled");

    const [user, setUser] = useState({
        fullname: "",
        username: "",
        email: "",
        avatar: ""
    })

    const [userError, setUserError] = useState({
        fullnameError: "",
        surnameError: "",
        emailError: "",
        avatarError: ""
    })

    const profileInputHandler = (e) => {
        setUser((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    const checkInputError = (e) => {
        const error = validateRegisterData(e.target.name, e.target.value);
    
        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }));
    };

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage])

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const fetched = await GetProfile(tokenStorage);
        
                setLoadedData(true);
        
                setUser({
                    fullname: fetched.data.fullname,
                    username: fetched.data.username,
                    email: fetched.data.email,
                    avatar: fetched.data.avatar
                });
    
            } catch (error) {
                console.log(error);
            }
        };
    
        if (!loadedData) {
            getUserProfile();
        }
    }, [user]);

    const updateUserData = async () => {
        try {
            console.log("Im saving data...")
            setWrite("disabled")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="profileDesign">
            <Header/>
            <div className="profileContent">
                <img className="avatarImgProfile" src={`${publicServer}public/${passport.decoded.avatar}`}/>
                {write !== "disabled" ? (
                    <>
                    <label htmlFor="file" className={"iconImg"}>
                        <i className="bi bi-images"></i>
                    </label>
                    <input id="file" type="file" name="avatar" disabled={write} className={"fileSelector"}/>
                    </>
                ) : (
                    <></>
                )}
                <FormInput
                    labelText={"fullname"}
                    className={"formInputField"}
                    type={"text"}
                    name={"fullname"}
                    placeholder={"Write your entire name"}
                    disabled={write}
                    value={user.fullname || ""}
                    onChange={e => profileInputHandler(e)}
                    onBlur={e => checkInputError(e)}
                />
                <div className="inputError">{userError.fullnameError}</div>
                <FormInput
                    labelText={"username"}
                    className={"formInputField"}
                    type={"text"}
                    name={"username"}
                    placeholder={"Write a username"}
                    disabled={write}
                    value={user.username || ""}
                    onChange={e => profileInputHandler(e)}
                    onBlur={e => checkInputError(e)}
                />
                <div className="inputError">{userError.usernameError}</div>
                <FormInput
                    labelText={"email"}
                    className={"formInputField"}
                    type={"email"}
                    name={"email"}
                    placeholder={"Write an email"}
                    disabled={write}
                    value={user.email || ""}
                    onChange={e => profileInputHandler(e)}
                    onBlur={e => checkInputError(e)}
                />
                <div className="inputError">{userError.emailError}</div>
                <FormButton
                    buttonText={write === "" ? "SAVE" : "EDIT"}
                    className={write === "" ? "formButtonDesignEdit" : "formButtonDesign"}
                    onClickFunction={write === "" ? updateUserData : ()=> setWrite("")}
                />
            </div>
        </div>
    )
}