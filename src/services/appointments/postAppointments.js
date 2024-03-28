import { server } from "../config"

export const PostAppointment = async (token, appointment) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "service_name": appointment.service,
            "appointment_date": appointment.date,
            "tattooer": appointment.tattooer,
            "establishment": appointment.establishment
        })
    };

    try {
        const response = await fetch(`${server}appointments`, options);
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