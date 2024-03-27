import { server } from "../config"

export const GetEstablishments = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };

    try {
        const response = await fetch(`${server}establishments/`, options);
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