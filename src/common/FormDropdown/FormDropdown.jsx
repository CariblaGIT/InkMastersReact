import "./FormDropdown.css";
import { useEffect, useState } from "react";

export const FormDropdown = ({array, dataType, name, labelText, selectedOption, onChange}) => {
    const [id, setId] = useState()
    const [value, setValue] = useState()

    useEffect(() => {
        switch (dataType){
            case "services":
                setId("id")
                setValue("serviceName")
                break;
            case "tattooers":
                setId("username")
                setValue("fullname")
                break;
            case "establishments":
                setId("id")
                setValue("address")
                break;
            case "roles":
                setId("id")
                setValue("name")
                break;
        }
    }, [])

    return (
        <>
            <label className={"formDropdownLabel "+dataType}>{labelText}</label>
            {selectedOption ? (
                <select className="formDropdownDesign" name={name} onChange={onChange} value={selectedOption}>
                {
                    array.map((item) => {
                        if(item[id] !== undefined){
                            return(
                                <option className="optionDropdown" key={item[id]} value={item[value]}>{item[value]}</option>
                            )
                        }
                    })
                }
                </select>
            ) : (
                <select className="formDropdownDesign" name={name} onChange={onChange} defaultValue="">
                    <option value="" key={"default-value"} disabled hidden>Choose here</option>
                    {
                        array.map((item) => {
                            if(item[id] !== undefined){
                                return(
                                    <option className="optionDropdown" key={item[id]} value={item[value]}>{item[value]}</option>
                                )
                            }
                        })
                    }
                </select>
            )}
        </>
    )
}