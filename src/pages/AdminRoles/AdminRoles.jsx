import "./AdminRoles.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Header } from "../../common/Header/Header"
import { Table } from "react-bootstrap"
import { EntryActionButton } from "../../common/EntryActionButton/EntryActionButton"
import { GetRoles } from "../../services/roles/roleGetRoles"

export const AdminRoles = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [roles, setRoless] = useState(undefined);
    const [loadedData, setLoadedData] = useState(false);
    const adminRegexp = /\b(?:admin|super_admin)\b/;
    const navigate = useNavigate();

    useEffect(() => {
        if (!tokenStorage || !adminRegexp.test(passport.decoded.roleName)) {
            navigate("/")
        }
    }, [tokenStorage])

    const backToAdmin = () => {
        navigate("/admin-panel")
    }

    useEffect(() => {
        const getRoles = async () => {
            try {
                const fetched = await GetRoles(tokenStorage);
                setLoadedData(true);
                setRoless(fetched.data);
            } catch (error) {
                console.log(error);
            }
        }
        if (!loadedData) { getRoles() };
    })

    return (
        <div className="adminRolesDesign">
            <Header/>
            <div className="adminRolesContent">
                {roles === undefined ? (
                    <>LOADING</>
                ) : (
                    <>
                        <div className="buttonsSection">
                            <button className="backAdminPanel" onClick={backToAdmin}>
                                Back <i className="bi bi-arrow-counterclockwise arrowBackIcon"></i>
                            </button>
                            <button className="newRoleBtn" onClick={() => console.log("ADD")}>
                                New <i className="bi bi-shop roleIcon"></i>
                            </button>
                        </div>
                        <div className="rolesContent">
                        <Table responsive striped variant="dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                    <td>{item.name}</td>
                                                    <td className="buttonSection">
                                                        <EntryActionButton
                                                            className={"editButton"}
                                                            buttonIcon={"pencil-square"}
                                                            onClickFunction={() => console.log(item)}
                                                        />
                                                        <EntryActionButton
                                                            className={"deleteButton"}
                                                            buttonIcon={"trash"}
                                                            onClickFunction={() => console.log(item.id, index)}
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