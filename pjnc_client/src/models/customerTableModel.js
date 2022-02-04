import { PrinterOutlined } from '@ant-design/icons';

const customerColumns = () => {
	return [
		// {
		// 	title: 'CUSTOMER ID',
		// 	dataIndex: '_id',
		// 	key: '_id',
		// 	responsive: ['sm'],
		// 	width: '5%',
		// 	// width: 200,
		// 	fixed: 'left',
		// 	render: (text) => <div style={{ wordWrap: 'break-word' }}>{text}</div>,
		// },
		{
			title: 'CUSTOMER NAME',
			dataIndex: 'customerName',
			key: 'customerName',
			width: '5%',
			// width: 200,
			fixed: 'left',
			responsive: ['sm'],
			render: (text) => <div style={{ wordWrap: 'break-word' }}>{text}</div>,
		},
		{
			title: 'LOCATION',
			dataIndex: 'location',
			key: 'location',
			width: '5%',
			// width: 200,
			fixed: 'left',
			responsive: ['sm'],
			render: (text) => <div style={{ wordWrap: 'break-word' }}>{text}</div>,
		},
		// {
		// 	title: 'ACTION',
		// 	key: 'action',
		// 	responsive: ['sm'],
		// 	width: 200,
		// 	fixed: 'right',
		// 	render: (data) => {
		// 		return (
		// 			<>
		// 				<PrinterOutlined
		// 					onClick={(e) => {
		// 						e.stopPropagation();
		// 						onPrint(data);
		// 					}}
		// 				/>
		// 			</>
		// 		);
		// 	},
		// },
	];
};
export default customerColumns;
