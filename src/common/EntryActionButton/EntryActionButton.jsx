import "./EntryActionButton.css"

export const EntryActionButton = ({buttonIcon, className, onClickFunction}) => {
    return (
        <button className={className} onClick={onClickFunction}>
            <i className={"bi bi-"+buttonIcon}/>
            {/* <i class="bi bi-pencil-square"></i>
            <i class="bi bi-trash"></i> */}
        </button>
    )
}