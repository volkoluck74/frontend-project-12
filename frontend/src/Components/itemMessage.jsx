//import {useSelector } from "react-redux"

const ItemMessage = (props) => {
    return(
        <div key = {props.item.id} className="text-break mb-2">
            <b>{props.item.username}</b>
            {`: `}
            {props.item.body}
        </div>
    )
}

export default ItemMessage