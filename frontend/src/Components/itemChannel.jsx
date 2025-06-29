
import {useSelector } from "react-redux"

const ItemChannel = (props) => {
    const {currentChannelId} = useSelector(state => state.chats)
    const cn =  props.item.id === currentChannelId ? "w-100 rounded-0 text-start btn btn-secondary" : "w-100 rounded-0 text-start btn"
    return(
        <li key = {props.item.id} className="nav-item w-100">
            <button type="button" className={cn}>
                <span className="me-1">#</span>
                {props.item.name}
            </button>
        </li>
    )
}

export default ItemChannel