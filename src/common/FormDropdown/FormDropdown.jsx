import "./FormDropdown.css"

export const FormDropdown = ({array, dataType, name, labelText, onChange}) => {
    return (
        <>
            <label className="formDropdownLabel">{labelText}</label>
            <select className="formDropdownDesign" name={name} onChange={onChange} defaultValue="">
                <option value="" disabled hidden>Choose here</option>
                {dataType === "services" ? (
                    array.map((item) => {
                        return(
                            <option className="optionDropdown" key={item.id} value={item.serviceName}>{item.serviceName}</option>
                        )
                    })
                ) : (
                    array.map((item) => {
                        return(
                            <option className="optionDropdown" key={item.username} value={item.fullname}>{item.fullname}</option>
                        )
                    })
                )}
            </select>
        </>
    )
}