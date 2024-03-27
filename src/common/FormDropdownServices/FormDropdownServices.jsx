import "./FormDropdownServices.css"

export const FormDropdownServices = ({array}) => {
    return (
        <select className="formDropdownDesign">
            {array.map((item) => {
                return(
                    <option className="optionDropdown" key={item.id} value={item.serviceName}>{item.serviceName}</option>
                )
            })}
        </select>
    )
}