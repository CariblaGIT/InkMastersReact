const root = "https://inkmasters-dev-tmge.2.us-1.fl0.io/api/";
//const root = "https://localhost:4000/api/";

export const LoginUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(`${root}auth/login`, options);
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