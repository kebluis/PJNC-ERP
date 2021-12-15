import { PrinterOutlined } from '@ant-design/icons';

const orderColumns = (onPrint) => {
	return [
		{
			title: 'ORDER NUMBER',
			dataIndex: '_id',
			key: '_id',
			responsive: ['sm'],
		},
		{
			title: 'CUSTOMER NAME',
			dataIndex: 'customerName',
			key: 'customerName',
			responsive: ['sm'],
		},
		{
			title: 'TOTAL PRICE',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			responsive: ['sm'],
		},
		{
			title: 'AMOUNT PAID',
			dataIndex: 'amountPaid',
			key: 'amountPaid',
			responsive: ['sm'],
		},
		{
			title: 'LOCATION',
			dataIndex: 'location',
			key: 'location',
			responsive: ['sm'],
		},
		{
			title: 'DELIVERY DATE',
			dataIndex: 'deliveryDate',
			key: 'deliveryDate',
			responsive: ['sm'],
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
			key: 'status',
			responsive: ['sm'],
		},
		{
			title: 'ACTION',
			key: 'action',
			responsive: ['sm'],
			render: (data) => {
				return (
					<>
						<PrinterOutlined
							onClick={(e) => {
								e.stopPropagation();
								onPrint(data);
							}}
						/>
					</>
				);
			},
		},
	];
};
export default orderColumns;
