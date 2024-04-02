
export const validateRegisterData = (type, value) => {
    switch(type){
        case "fullname":
            const regExpFullname = /^[a-zA-ZñÑ ]+$/
            if(!regExpFullname.test(value)){
                return "No correct name inserted"
            }
            break;
        case "username":
            const regExpUsername = /^[A-Za-zñÑ0-9._]+$/
            if(!regExpUsername.test(value)){
                return "No correct username inserted"
            }
            break;
        case "email":
            const regExpEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
            if(!regExpEmail.test(value)){
                return "No correct email inserted"
            }
            break;
        case "password":
            const regExpPassword = /^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/
            if(value.length < 10 || !regExpPassword.test(value) || value.includes(' ')){
                return "No correct password inserted"
            }
            break;
        default:
            return "No error"
    }
}