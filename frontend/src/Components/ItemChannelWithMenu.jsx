import React, { useRef, useEffect } from 'react'
import { changeCurrentChannel, changeChannelWithMenu, changeCurrentRemoveChannel, openRemovingChannelDialog, changeCurentRenameChannel, openRenamingChannelDialog} from "../slices/UIslice.jsx"
import cn from 'classnames'
import { useDispatch, useSelector } from "react-redux"

const ItemChannelWithMenu = (props) => {
    const dispatch = useDispatch()
    const { numberChannelWithMenu, currentChannelId} = useSelector(state => state.uiState)
    
    const menuRef = useRef(null)
    const toggleButtonRef = useRef(null)
  
    const isMenuActionClicked = useRef(false)
    
    const cnMainButton = props.item.id === currentChannelId ? 
        "w-100 rounded-0 text-start btn btn-secondary" : 
        "w-100 rounded-0 text-start btn"
    
    const cnDivGroup = props.item.id === numberChannelWithMenu ? 
        "d-flex drpotown show btn-group" : 
        "d-flex drpotown btn-group"
    
    const cnMenuBtn = cn('flex-grow-0', 'dropdown-toggle', 'dropdown-toggle-split', 'btn', {
        'btn-secondary': props.item.id === currentChannelId,
        'show': props.item.id === numberChannelWithMenu,
    })

    const changeChannel = () => {
        dispatch(changeCurrentChannel({ id: props.item.id }))
        if (props.item.id === numberChannelWithMenu) {
            dispatch(changeChannelWithMenu({ id: 0 }))
        }
    }

    const handleMenuToggle = () => {
        if (props.item.id === numberChannelWithMenu) {
            dispatch(changeChannelWithMenu({ id: 0 }))
        } else {
            dispatch(changeChannelWithMenu({ id: props.item.id }))
        }
    }

    const handleMenuClear = () => {
        dispatch(changeChannelWithMenu({ id: 0 }))
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuActionClicked.current) {
                isMenuActionClicked.current = false;
                return;
            }
            
            if (props.item.id === numberChannelWithMenu &&
                menuRef.current && 
                !menuRef.current.contains(event.target) &&
                toggleButtonRef.current && 
                !toggleButtonRef.current.contains(event.target)) {
                handleMenuClear();
            }
        }
        
        if (props.item.id === numberChannelWithMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [props.item.id, numberChannelWithMenu, handleMenuClear]);

    const deleteChannel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        isMenuActionClicked.current = true;
        
        dispatch(changeCurrentRemoveChannel({ id: props.item.id }))
        dispatch(openRemovingChannelDialog())
        setTimeout(() => {
            handleMenuClear();
            isMenuActionClicked.current = false;
        }, 100);
    }

    const renameChannel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        isMenuActionClicked.current = true;
        
        dispatch(changeCurentRenameChannel({ id: props.item.id }))
        dispatch(openRenamingChannelDialog())
        
        setTimeout(() => {
            handleMenuClear();
            isMenuActionClicked.current = false;
        }, 100);
    }
    return (
        <li className="nav-item w-100">
            <div role='group' className={cnDivGroup}>
                <button 
                    type="button" 
                    className={cnMainButton} 
                    onClick={changeChannel}
                >
                    <span className="me-1">#</span>
                    {props.item.name}
                </button>
                <button 
                    type="button" 
                    aria-expanded={props.item.id === numberChannelWithMenu} 
                    className={cnMenuBtn}
                    onClick={handleMenuToggle}
                    ref={toggleButtonRef}
                >
                    <span className="visually-hidden">Управление каналом</span>
                </button>
                <div 
                    className={props.item.id === numberChannelWithMenu ? "dropdown-menu show" : "dropdown-menu"}
                    ref={menuRef}
                >
                    <a className="dropdown-item" role="button" tabIndex="0" href="#" onClick = {deleteChannel}>
                        Удалить
                    </a>
                    <a className="dropdown-item" role="button" tabIndex="0" href="#" onClick={renameChannel}>
                        Переименовать
                    </a>
                </div>
            </div>
        </li>
    )
}

export default ItemChannelWithMenu