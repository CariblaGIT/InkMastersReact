import "./AdminUsers.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Header } from "../../common/Header/Header"
import { GetUsers } from "../../services/users/userGetUsers"
import { Table } from "react-bootstrap"
import { EntryActionButton } from "../../common/EntryActionButton/EntryActionButton"

export const AdminUsers = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [users, setUsers] = useState(undefined);
    const [loadedData, setLoadedData] = useState(false);
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
        if (!loadedData) { getUsers() };
    }, [])

    const backToAdmin = () => {
        navigate("/admin-panel")
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
                            <button className="newUserBtn" onClick={() => console.log("New")}>
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
                                        <th>Avatar</th>
                                        <th>Email</th>
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
                                                    <td>{item.avatar}</td>
                                                    <td>{item.email}</td>
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
        </div>
    )
}