import "./AdminEstablishments.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../common/Header/Header";
import { Table } from "react-bootstrap";
import { EntryActionButton } from "../../common/EntryActionButton/EntryActionButton";
import { GetEstablishments } from "../../services/apiCalls";
import { LoadingIcon } from "../../common/LoadingIcon/LoadingIcon";

export const AdminEstablishments = () => {
    const passport = JSON.parse(localStorage.getItem("passport"))
    const [tokenStorage, setTokenStorage] = useState(passport?.token)
    const [establishments, setEstablishments] = useState(undefined)
    const [loadedData, setLoadedData] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!tokenStorage || !(passport.decoded.roleName).includes("admin")) {
            navigate("/")
        }
    }, [tokenStorage])

    const backToAdmin = () => {
        navigate("/admin-panel")
    }

    useEffect(() => {
        const getEstablishmentss = async () => {
            try {
                const fetched = await GetEstablishments(tokenStorage)
                setLoadedData(true)
                setEstablishments(fetched.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (!loadedData) { getEstablishmentss() }
    })

    return (
        <div className="adminEstablishmentsDesign">
            <Header/>
            <div className="adminEstablishmentsContent">
                {establishments === undefined ? (
                    <LoadingIcon/>
                ) : (
                    <>
                        <div className="buttonsSection">
                            <button className="backAdminPanel" onClick={backToAdmin}>
                                Back <i className="bi bi-arrow-counterclockwise arrowBackIcon"></i>
                            </button>
                            <button className="newEstablishmentBtn" onClick={() => console.log("ADD")}>
                                New <i className="bi bi-shop establishmentIcon"></i>
                            </button>
                        </div>
                        <div className="establishmentsContent">
                        <Table responsive striped variant="dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>Postal Code</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {establishments.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.city}</td>
                                                    <td>{item.postalCode}</td>
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