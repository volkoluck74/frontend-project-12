//import {changeCurrentChannel} from "../slices/chatSlice"
import {changeCurrentChannel} from "../slices/UIslice.jsx"
import { useDispatch, useSelector } from "react-redux"

const ItemChannel = (props) => {
    const dispatch = useDispatch()
    const {currentChannelId} = useSelector(state => state.uiState) 
    const cn =  props.item.id === currentChannelId ? "w-100 rounded-0 text-start btn btn-secondary" : "w-100 rounded-0 text-start btn"
    const changeChannel = (id) => {
        dispatch(changeCurrentChannel({id}))
        console.log(currentChannelId)
    }
    return(
        <li key = {props.item.id} className="nav-item w-100">
            <button type="button" className={cn} onClick = {() => changeChannel(props.item.id)}>
                <span className="me-1">#</span>
                {props.item.name}
            </button>
        </li>
    )
}

export default ItemChannel