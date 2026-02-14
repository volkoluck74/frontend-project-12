import { useTranslation } from 'react-i18next';

const ItemMessage = props => {
  const { t } = useTranslation('all');
  return (
    <div key = {props.item.id} className="text-break mb-2">
      <b>{props.item.username}</b>
      {t('Authors_separator')}
      {props.item.body}
    </div>
  );
};

export default ItemMessage;
