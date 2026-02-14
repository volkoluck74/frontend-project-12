import { changeCurrentChannel } from '../slices/UIslice.jsx';
import { useDispatch, useSelector } from 'react-redux';

const ItemChannel = props => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector(state => state.uiState);
  const cn = `w-100 rounded-0 text-start btn ${props.item.id === currentChannelId ? 'btn-secondary' : ''}`;
  const changeChannel = id => {
    dispatch(changeCurrentChannel({ id }));
  };
  return (
    <li key = {props.item.id} className="nav-item w-100">
      <button type="button" className={cn} onClick = {() => changeChannel(props.item.id)}>
        <span className="me-1">#</span>
        {props.item.name}
      </button>
    </li>
  );
};

export default ItemChannel;
