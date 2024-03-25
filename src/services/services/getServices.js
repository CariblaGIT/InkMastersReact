import { server } from "../config"

export const GetServices = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };

    try {
        const response = await fetch(`${server}services/`, options);
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