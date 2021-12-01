import { Table } from 'antd';
import './GenericTable.css';

const GenericTable = ({ columns, data, pagination }) => {
	return (
		<Table
			className="table-content"
			columns={columns}
			dataSource={data}
			pagination={pagination ?? {}}
		/>
	);
};

export default GenericTable;
