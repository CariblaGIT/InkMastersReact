import { server } from "../config"

export const UpdateAppointment = async (token, data, id) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "id" : id,
            "appointmentDate" : data.date,
            "service" : data.service,
            "establishment" : data.establishment,
            "tattooer" : data.tattooer
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
        return error;
    }
}