import { useEffect, useState } from "react"
import { Header } from "../../common/Header/Header"
import { useNavigate } from "react-router-dom"
import "./Profile.css"
import { GetProfile } from "../../services/users/userGetProfile"
import { FormInput } from "../../common/FormInput/FormInput"
import { publicServer } from "../../services/config"
import { FormButton } from "../../common/FormButton/FormButton"
import { validateRegisterData } from "../../utils/userDataValidations"
import { UpdateProfileWithAvatar, UpdateProfileWithoutAvatar } from "../../services/users/userUpdateProfile"

export const Profile = () => {
    const passport = JSON.parse(localStorage.getItem("passport"))
    const navigate = useNavigate()

    const [tokenStorage, setTokenStorage] = useState(passport?.token)
    const [loadedData, setLoadedData] = useState(false)
    const [write, setWrite] = useState("disabled")
    const [avatarToUpload, setAvatarToUpload] = useState(undefined);
    const [avatar, setAvatar] = useState(publicServer + passport?.decoded.avatar)

    const [user, setUser] = useState({
        fullname: "",
        username: "",
        email: "",
        avatar: ""
    })

    const [userPrevToUpdate, setUserPrevToUpdate] = useState({
        fullname: "",
        username: "",
        email: "",
        avatar: ""
    })

    const [userError, setUserError] = useState({
        fullnameError: "",
        usernameError: "",
        emailError: "",
        avatarError: ""
    })

    const [msgUploadedFile, setMsgUploadedFile] = useState("")
    const [msgUpdatedProfile, setMsgUpdatedProfile] = useState("")

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

    const handleFileChange = (e) => {
        if (e.target.files) {
            setAvatarToUpload(e.target.files[0])
            setMsgUploadedFile("File retrieved, save to change avatar")
        }
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

    const activateUpdate = () => {
        setWrite("")
        setUserPrevToUpdate(user)
    }

    const cancelUpdateProfile = () => {
        setWrite("disabled")
        setUser(userPrevToUpdate)
        setAvatarToUpload(undefined)
        setMsgUploadedFile("")
    }

    const updateUserData = async () => {
        try {
            if(avatarToUpload === undefined){
                const fetched = await UpdateProfileWithoutAvatar(tokenStorage, user)
                setUser({
                    fullname: fetched.data.fullname,
                    username: fetched.data.username,
                    email: fetched.data.email
                })
                setUserPrevToUpdate(user)
                setMsgUpdatedProfile("Updated profile successfully")
                setWrite("disabled")
                setTimeout(() => {
                    setMsgUpdatedProfile("");
                }, 2000);
            } else {
                const fetched = await UpdateProfileWithAvatar(tokenStorage, user, avatarToUpload)
                const newUserData = {
                    fullname: fetched.data.fullname,
                    username: fetched.data.username,
                    email: fetched.data.email,
                    avatar: fetched.data.avatar
                }
                setUser(newUserData)
                setUserPrevToUpdate(newUserData)
                const newAvatar = fetched.data.avatar
                setAvatarToUpload(undefined)
                setAvatar(publicServer + newAvatar)
                const arrayPassport = localStorage.getItem("passport")
                let passportParsed = JSON.parse(arrayPassport)
                passportParsed["decoded"]["avatar"] = newAvatar
                localStorage.setItem("passport", JSON.stringify(passportParsed))
                setWrite("disabled")
                setMsgUploadedFile("")
                setMsgUpdatedProfile("Updated profile successfully")
                setTimeout(() => {
                    setMsgUpdatedProfile("");
                }, 2000);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="profileDesign">
            <Header/>
            <div className="profileContent">
                <img className="avatarImgProfile" src={avatar}/>
                {write !== "disabled" ? (
                    <>
                    <label htmlFor="file" className={"iconImg"}>
                        <i className="bi bi-images"></i>
                    </label>
                    <input id="file" type="file" name="avatar" disabled={write} className={"fileSelector"} onChange={handleFileChange}/>
                    </>
                ) : (
                    <></>
                )}
                <div className="fileRetrievedMsg">{msgUploadedFile}</div>
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
                <div className="interactionButtons">
                    {write === "" ? (
                        <FormButton
                            buttonText={"RETURN"}
                            className={"formButtonDesign"}
                            onClickFunction={cancelUpdateProfile}
                        />
                    ) : (
                        <></>
                    )}
                    <FormButton
                        buttonText={write === "" ? "SAVE" : "EDIT"}
                        className={write === "" ? "formButtonDesignEdit" : "formButtonDesign"}
                        onClickFunction={write === "" ? updateUserData : activateUpdate}
                    />
                </div>
                <div className="updatedProfile">{msgUpdatedProfile}</div>
            </div>
        </div>
    )
}