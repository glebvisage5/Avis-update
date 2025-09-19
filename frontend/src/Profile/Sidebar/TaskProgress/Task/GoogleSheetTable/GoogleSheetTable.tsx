import React, { useEffect, useState } from 'react';
import styles from './GoogleSheetTable.module.css';

interface TableRow {
    [key: string]: string | number | null;
}

interface GoogleSheetTableProps {
    subjectId: string | number;
    studyGroup?: string;
    names?: string;
    onHeadersLoaded?: (headers: string[]) => void;
    maxColumns?: number;
}

const GoogleSheetTable: React.FC<GoogleSheetTableProps> = ({ subjectId, studyGroup, names, onHeadersLoaded, maxColumns }) => {
    const [data, setData] = useState<TableRow[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const targetName = names || ''
    const foundRow = data.find(row => {
        const fullName = row['ФИО'];
        return typeof fullName === 'string' && fullName.includes(targetName);
    });

    useEffect(() => {
        if (!subjectId) return;

        setLoading(true);
        setError(null);

        fetch(`http://localhost:5000/api/subjects/${subjectId}/link-data?group=${encodeURIComponent(studyGroup)}`)
        .then((res) => {
            if (!res.ok) {
            throw new Error('Ошибка загрузки данных таблицы');
            }
            return res.json();
        })
        .then((json: TableRow[]) => {
            setData(json);
            if (json.length > 0 && onHeadersLoaded) {
                const firstRow = json[0];
                const headers = Object.keys(firstRow).filter(h => h !== '№' && h !== 'ФИО');
                onHeadersLoaded(headers);
            }
        })
        .catch((err) => {
            setError(err.message);
            setData([]);
        })
        .finally(() => setLoading(false));
    }, [subjectId, studyGroup]);

    if (loading) return <p className={styles.text}>Загрузка таблицы...</p>;
    if (error) return <p className={styles.text} style={{ color: 'red' }}>Ошибка: {error}</p>;
    if (!data.length) return <p className={styles.text}>Нет данных для отображения</p>;

    const headers = foundRow ? Object.keys(foundRow) : [];
    const limitedMaxColumns = (maxColumns ?? 0) + 2
    const displayedHeaders = headers.slice(0, limitedMaxColumns);

    return (
        <>
            <div className={styles.tableWrapper}>
                {foundRow ? (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                {displayedHeaders.map((header) => (
                                    <th key={header} className={styles.th}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.trEven}>
                                {displayedHeaders.map((header) => (
                                    <td key={header} className={styles.td}>
                                        {foundRow[header] ?? ''}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p className={styles.table}>Вы не принадлежите группе ИКБО-14-23</p>
                )}
            </div>
            <div className={styles.fake_scrollbar}>
                <div className={styles.fake_scrollbar_thumb}></div>
            </div>
        </>
    );
};

export default GoogleSheetTable;