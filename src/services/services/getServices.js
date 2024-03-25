const root = "https://inkmasters-dev-tmge.2.us-1.fl0.io/api/";
//const root = "https://localhost:4000/api/";

export const GetServices = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };

    try {
        const response = await fetch(`${root}services/`, options);
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