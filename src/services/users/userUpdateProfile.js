import { server } from "../config"

export const UpdateProfileWithoutAvatar = async (token, data) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };
  
    try {
        const response = await fetch(`${server}users/profile`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const UpdateProfileWithAvatar = async (token, user, avatarFile) => {
    const formData = new FormData()
    formData.append("avatar", avatarFile)
    for(const userCredential in user){
        if(userCredential !== "avatar"){
            formData.append(`${userCredential}`, `${user[userCredential]}`)
        }
    }

    const options = {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    };
  
    try {
        const response = await fetch(`${server}users/profile`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};