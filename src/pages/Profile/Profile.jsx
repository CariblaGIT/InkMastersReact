import { useEffect, useState } from "react"
import { Header } from "../../common/Header/Header"
import { useNavigate } from "react-router-dom"
import "./Profile.css"
import { GetProfile } from "../../services/users/userGetProfile"
import { FormInput } from "../../common/FormInput/FormInput"
import { publicServer } from "../../services/config"

export const Profile = () => {
    const passport = JSON.parse(localStorage.getItem("passport"))
    const navigate = useNavigate()

    const [tokenStorage, setTokenStorage] = useState(passport?.token)
    const [loadedData, setLoadedData] = useState(false)

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
        //a gusto del consumidor....
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

    return (
        <div className="profileDesign">
            <Header/>
            <div className="profileContent">
                <img className="avatarImgProfile" src={`${publicServer}public/${passport.decoded.avatar}`}/>
                <FormInput
                    labelText={"fullname"}
                    className={"formInputField"}
                    type={"text"}
                    name={"fullname"}
                    placeholder={"Write your entire name"}
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
                    value={user.email || ""}
                    onChange={e => profileInputHandler(e)}
                    onBlur={e => checkInputError(e)}
                />
                <div className="inputError">{userError.emailError}</div>
            </div>
        </div>
    )
}