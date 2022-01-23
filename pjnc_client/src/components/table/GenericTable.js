import { Table } from 'antd';
import styles from './GenericTable.less';

const GenericTable = ({ columns, data, pagination, click, scroll }) => {
	return (
		<Table
			scroll={scroll ?? false}
			className={styles.table_content}
			onRow={(record, rowIndex) => {
				return {
					onClick: (event) => {
						click(event, record, rowIndex);
					},
				};
			}}
			columns={columns}
			dataSource={data}
			pagination={pagination ?? {}}
		/>
	);
};

export default GenericTable;
