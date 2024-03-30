import {Routes, Route, Navigate} from "react-router-dom"
import { Home } from "../Home/Home"
import { Register } from "../Register/Register"
import { Login } from "../Login/Login"
import { Profile } from "../Profile/Profile"
import { UserAppointments } from "../UserAppointments/UserAppointments"
import { AdminPanel } from "../AdminPanel/AdminPanel"
import { AdminUsers } from "../AdminUsers/AdminUsers"
import { AdminEstablishments } from "../AdminEstablishments/AdminEstablishments"
import { AdminServices } from "../AdminServices/AdminServices"
import { AdminRoles } from "../AdminRoles/AdminRoles"

export const Body = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to={"/"} replace/>} />
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/appointments" element={<UserAppointments/>}/>
            <Route path="/admin-panel" element={<AdminPanel/>}/>
            <Route path="/admin-panel/users" element={<AdminUsers/>}/>
            <Route path="/admin-panel/establishments" element={<AdminEstablishments/>}/>
            <Route path="/admin-panel/services" element={<AdminServices/>}/>
            <Route path="/admin-panel/roles" element={<AdminRoles/>}/>
        </Routes>
    )
}