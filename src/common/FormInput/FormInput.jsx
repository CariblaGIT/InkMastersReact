import "./FormInput.css"

export const FormInput = ({labelText, className, type, name, value, placeholder, onChange, onBlur}) => {
    return(
        <div className="formInputDesign">
            <label className="formInputLabel">{labelText}</label>
            <input
                className={className} 
                type={type} 
                name={name} 
                value={value} 
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    )
}