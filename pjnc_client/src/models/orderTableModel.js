import GenericDropDown from '../components/GenericDropDown';
import { Menu } from 'antd';

const orderColumns = [
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
		key: 'status',
		responsive: ['sm'],
		render: (data) => {
			const options = [
				{ key: 0, label: 'Preparing' },
				{ key: 1, label: 'Delivering' },
				{ key: 2, label: 'Paid' },
				{ key: 3, label: 'Partially Paid' },
				{ key: 4, label: 'Return' },
			];
			return <GenericDropDown selected={data.status} options={options} />;
		},
	},
];
export default orderColumns;
