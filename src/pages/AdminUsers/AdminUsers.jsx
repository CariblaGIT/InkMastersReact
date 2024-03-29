import "./AdminUsers.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Header } from "../../common/Header/Header"
import { GetUsers } from "../../services/users/userGetUsers"
import { Table } from "react-bootstrap"
import { EntryActionButton } from "../../common/EntryActionButton/EntryActionButton"
import { PopUpUser } from "../../common/PopUpUser/PopUpUser"
import { GetRoles } from "../../services/roles/roleGetRoles"

export const AdminUsers = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [users, setUsers] = useState(undefined);
    const [roles, setRoles] = useState(undefined);
    const [loadedData, setLoadedData] = useState(false);
    const [loadedRolesData, setLoadedRolesData] = useState(false);
    const [modalCreateUserShow, setModalCreateUserShow] = useState(false);
    const adminRegexp = /\b(?:admin|super_admin)\b/
    const navigate = useNavigate()

    useEffect(() => {
        if (!tokenStorage || !adminRegexp.test(passport.decoded.roleName)) {
            navigate("/")
        }
    }, [tokenStorage])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetched = await GetUsers(tokenStorage);
                setLoadedData(true);
                setUsers(fetched.data);
            } catch (error) {
                console.log(error);
            }
        }

        const getRoles = async () => {
            try {
                const fetched = await GetRoles(tokenStorage);
                setLoadedRolesData(true);
                setRoles(fetched.data);
            } catch (error) {
                console.log(error);
            }
        }
        if (!loadedData) { getUsers() };
        if (!loadedRolesData) { getRoles() };
    }, [])

    const backToAdmin = () => {
        navigate("/admin-panel")
    }

    const popupAddUser = () => {
        setModalCreateUserShow(true)
    }

    const closingAddUser = () => {
        setModalCreateUserShow(false)
        if(localStorage.getItem("createdUser")){
            const newUser = JSON.parse(localStorage.getItem("createdUser"));
            const allUsers = users
            allUsers.push(newUser)
            setUsers(allUsers)
            localStorage.removeItem("createdUser")
        }
    }

    return (
        <div className="adminUsersDesign">
            <Header/>
            <div className="adminUsersContent">
                {users === undefined ? (
                    <>LOADING</>
                ) : (
                    <>
                        <div className="buttonsSection">
                            <button className="backAdminPanel" onClick={backToAdmin}>
                                Back <i className="bi bi-arrow-counterclockwise arrowBackIcon"></i>
                            </button>
                            <button className="newUserBtn" onClick={popupAddUser}>
                                New <i className="bi bi-person-fill-add userIcon"></i>
                            </button>
                        </div>
                        <div className="usersContent">
                        <Table responsive striped variant="dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Fullname</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                    <td>{item.fullname}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.role.name}</td>
                                                    <td className="buttonSection">
                                                        <EntryActionButton
                                                            className={"editButton"}
                                                            buttonIcon={"pencil-square"}
                                                            onClickFunction={() => console.log("Edit")}
                                                        />
                                                        <EntryActionButton
                                                            className={"deleteButton"}
                                                            buttonIcon={"trash"}
                                                            onClickFunction={() => console.log("Delete")}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </>
                )}
            </div>
            {modalCreateUserShow && (
                <PopUpUser
                    show={modalCreateUserShow}
                    roles={roles}
                    onHide={closingAddUser}
                    type={"Create"}
                />
            )}
        </div>
    )
}