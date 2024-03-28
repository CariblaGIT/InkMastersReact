import { server } from "../config"

export const DeleteAppointment = async (token, id) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${server}appointments/${id}`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
};