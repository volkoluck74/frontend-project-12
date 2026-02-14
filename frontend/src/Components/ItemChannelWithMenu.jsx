import { useRef, useEffect, useCallback } from 'react';
import { changeCurrentChannel, changeChannelWithOpenMenu, changeCurrentRemoveChannel,
  openRemovingChannelDialog, changeCurentRenameChannel, openRenamingChannelDialog } from '../slices/UIslice.jsx';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ItemChannelWithMenu = props => {
  const { t } = useTranslation('all');
  const dispatch = useDispatch();
  const { channelWithOpenMenuId, currentChannelId } = useSelector(state => state.uiState);
  const isCurrentChannel = props.item.id === currentChannelId;
  const isChannelWithMenu = props.item.id === channelWithOpenMenuId;
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const cnMainButton = `w-100 rounded-0 text-start btn ${isCurrentChannel ? 'btn-secondary' : ''}`;

  const cnDivGroup = `d-flex drpotown btn-group ${isChannelWithMenu ? 'show' : ''}`;

  const cnMenuBtn = cn(
    'flex-grow-0',
    'dropdown-toggle',
    'dropdown-toggle-split',
    'btn', {
      'btn-secondary': isCurrentChannel,
      show: isChannelWithMenu,
    },
  );

  const changeChannel = () => {
    dispatch(changeCurrentChannel({ id: props.item.id }));
    if (isChannelWithMenu) {
      dispatch(changeChannelWithOpenMenu({ id: 0 }));
    }
  };

  const handleMenuToggle = () => {
    isChannelWithMenu ? dispatch(changeChannelWithOpenMenu({ id: 0 })) : dispatch(changeChannelWithOpenMenu({ id: props.item.id }));
  };

  const handleMenuClear = useCallback(() => {
    dispatch(changeChannelWithOpenMenu({ id: 0 }));
  }, [dispatch]);
  useEffect(() => {
    const handleClickOutside = event => {
      if (isChannelWithMenu
        && menuRef.current
        && !menuRef.current.contains(event.target)
        && toggleButtonRef.current
        && !toggleButtonRef.current.contains(event.target)) {
        handleMenuClear();
      }
    };

    if (isChannelWithMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChannelWithMenu, handleMenuClear]);

  const deleteChannel = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(changeCurrentRemoveChannel({ id: props.item.id }));
    dispatch(openRemovingChannelDialog());
    handleMenuClear();
  };

  const renameChannel = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(changeCurentRenameChannel({ id: props.item.id }));
    dispatch(openRenamingChannelDialog());
    handleMenuClear();
  };

  return (
    <li className="nav-item w-100">
      <div role="group" className={cnDivGroup}>
        <button type="button" className={cnMainButton} onClick={changeChannel}>
          <span className="me-1">#</span>
          {props.item.name}
        </button>
        <button
          type="button"
          aria-expanded={isChannelWithMenu}
          className={cnMenuBtn}
          onClick={handleMenuToggle}
          ref={toggleButtonRef}
        >
          <span className="visually-hidden">{t('Channel.Managment')}</span>
        </button>
        <div
          className={isChannelWithMenu ? 'dropdown-menu show' : 'dropdown-menu'}
          ref={menuRef}
        >
          <a className="dropdown-item" role="button" tabIndex="0" href="#" onMouseDown = {deleteChannel}>
            {t('Delete')}
          </a>
          <a className="dropdown-item" role="button" tabIndex="0" href="#" onMouseDown={renameChannel}>
            {t('Rename')}
          </a>
        </div>
      </div>
    </li>
  );
};

export default ItemChannelWithMenu;
