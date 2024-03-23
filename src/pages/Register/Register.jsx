import { FormInput } from "../../common/FormInput/FormInput"
import { Header } from "../../common/Header/Header"
import "./Register.css"

export const Register = () => {
    return (
        <div className="registerDesign">
            <Header/>
            <div className="registerContent">
                <FormInput
                    labelText={"fullname"}
                    className={"input-field"}
                    type={"text"}
                    name={"fullname"}
                    placeholder={"Write your entire name"}
                    value={""}
                    onChange={() => console.log("Hello")}
                    onBlur={() => console.log("World")}
                />
                <FormInput
                    labelText={"username"}
                    className={"input-field"}
                    type={"text"}
                    name={"username"}
                    placeholder={"Write a username"}
                    value={""}
                    onChange={() => console.log("Hello")}
                    onBlur={() => console.log("World")}
                />
                <FormInput
                    labelText={"email"}
                    className={"input-field"}
                    type={"email"}
                    name={"email"}
                    placeholder={"Write an email"}
                    value={""}
                    onChange={() => console.log("Hello")}
                    onBlur={() => console.log("World")}
                />
                <FormInput
                    labelText={"password"}
                    className={"input-field"}
                    type={"password"}
                    name={"password"}
                    placeholder={"Write a password"}
                    value={""}
                    onChange={() => console.log("Hello")}
                    onBlur={() => console.log("World")}
                />
            </div>
        </div>
    )
}