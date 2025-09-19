import style from './DataItem.module.css'

type DataItemProps = {
  label: string;
  value: string | number | null | undefined;
};

const DataItem: React.FC<DataItemProps> = ({ label, value }) => {
    const formatDate = (val: string | number | null | undefined) => {
        if (!val) return '—';

        const date = new Date(val);
        if (isNaN(date.getTime())) return val;

        return date.toLocaleDateString('ru-RU');
    };

    const displayValue = label.toLowerCase().includes('дата') ? formatDate(value) : value ?? '—';

    return (
        <div className={style.DataItem}>
            <p className={style.DataLabel}>{label}</p>
            <p className={style.DataValue}>{displayValue}</p>
        </div>
    );
};

export default DataItem;