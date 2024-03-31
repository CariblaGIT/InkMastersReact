import "./FormButton.css";

export const FormButton = ({buttonText, className, onClickFunction, disabled}) => {
    return (
        <button className={className} onClick={onClickFunction} disabled={disabled}>
            {buttonText}
        </button>
    )
}