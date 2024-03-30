import "./AdminServices.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Header } from "../../common/Header/Header"
import { Table } from "react-bootstrap"
import { EntryActionButton } from "../../common/EntryActionButton/EntryActionButton"
import { GetServices } from "../../services/services/getServices"
import { LoadingIcon } from "../../common/LoadingIcon/LoadingIcon"

export const AdminServices = () => {
    const passport = JSON.parse(localStorage.getItem("passport"));
    const [tokenStorage, setTokenStorage] = useState(passport?.token);
    const [services, setServices] = useState(undefined);
    const [loadedData, setLoadedData] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!tokenStorage || !(passport.decoded.roleName).includes("admin")) {
            navigate("/")
        }
    }, [tokenStorage])

    const backToAdmin = () => {
        navigate("/admin-panel")
    }

    useEffect(() => {
        const getServices = async () => {
            try {
                const fetched = await GetServices();
                setLoadedData(true);
                setServices(fetched.data);
            } catch (error) {
                console.log(error);
            }
        }
        if (!loadedData) { getServices() };
    })

    return (
        <div className="adminServicesDesign">
            <Header/>
            <div className="adminServicesContent">
                {services === undefined ? (
                    <LoadingIcon/>
                ) : (
                    <>
                        <div className="buttonsSection">
                            <button className="backAdminPanel" onClick={backToAdmin}>
                                Back <i className="bi bi-arrow-counterclockwise arrowBackIcon"></i>
                            </button>
                            <button className="newServiceBtn" onClick={() => console.log("ADD")}>
                                New <i className="bi bi-collection-fill serviceIcon"></i>
                            </button>
                        </div>
                        <div className="servicesContent">
                        <Table responsive striped variant="dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                    <td>{item.serviceName}</td>
                                                    <td>{item.description}</td>
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