


const Cell = ({ details, revealCell, updateFlag }) => {

    const getValue = () => {
        if (!details.revealed && details.flagged) {
            return "🚩";
        } else if (details.revealed && details.value !== 0) {
            if (details.value === 'X') {
                return "💣";
            } else {
                return details.value;
            }
        } else {
            return "";
        }
    }

    let className =
        "cell" +
        (details.revealed ? "" : " hidden") +
        (details.value === 'X' ? " is-mine" : "") +
        (details.flagged ? " is-flag" : "");

    return (
        <div className={className}
            onClick={() => revealCell(details.x, details.y)}
            onContextMenu={(e) => updateFlag(e, details.x, details.y)}>
            {getValue()}
        </div>
    )
}

export default Cell;

