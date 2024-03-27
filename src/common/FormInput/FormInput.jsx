import "./FormInput.css"

export const FormInput = ({labelText, className, type, name, value, placeholder, disabled, onChange, onBlur}) => {
    return(
        <div className="formInputDesign">
            <label className="formInputLabel">{labelText}</label>
            <input
                className={className} 
                type={type} 
                name={name} 
                value={value} 
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    )
}