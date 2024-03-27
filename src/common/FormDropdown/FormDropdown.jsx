import "./FormDropdown.css"

export const FormDropdown = ({array, dataType}) => {
    return (
        <select className="formDropdownDesign">
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
            {}
        </select>
    )
}