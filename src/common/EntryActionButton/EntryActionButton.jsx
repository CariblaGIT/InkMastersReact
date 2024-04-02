import "./EntryActionButton.css";

export const EntryActionButton = ({buttonIcon, className, onClickFunction}) => {
    return (
        <button className={className} onClick={onClickFunction}>
            <i className={"bi bi-"+buttonIcon}/>
        </button>
    )
}