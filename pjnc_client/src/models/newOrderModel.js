import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const newOrderForm = [
	{
		label: 'CUSTOMER NAME',
		dataIndex: 'customerName',
		type: 'select',
		options: [
			{ key: 0, label: 'first' },
			{ key: 1, label: 'second' },
		],
	},
	{
		label: 'LOCATION',
		dataIndex: 'location',
		type: 'select',
		options: [
			{ key: 0, label: 'first' },
			{ key: 1, label: 'second' },
		],
	},
	{
		label: 'DELIVERY DATE',
		dataIndex: 'deliveryDate',
		type: 'calendar',
	},
	{
		label: 'DELIVERY TIME',
		dataIndex: 'deliveryDate',
		type: 'time',
	},
	{
		label: 'UNIT',
		dataIndex: 'unit',
		type: 'number',
	},
	{
		label: 'ITEM',
		dataIndex: 'item',
		type: 'select',
		options: [
			{ key: 0, label: 'first' },
			{ key: 1, label: 'second' },
		],
	},
	{
		label: 'CUSTOMER PRICE',
		dataIndex: 'customerPrice',
		type: 'amount',
	},
	{
		label: 'TOTAL PRICE',
		dataIndex: 'totalPrice',
		type: 'amount',
	},
];
export const newOrderTable = [
	{
		title: 'UNIT',
		dataIndex: 'unit',
		key: 'unit',
		responsive: ['sm'],
	},
	{
		title: 'ITEM',
		dataIndex: 'item',
		key: 'item',
		responsive: ['sm'],
	},
	{
		title: 'CUSTOMER PRICE',
		dataIndex: 'customerPrice',
		key: 'customerPrice',
		responsive: ['sm'],
	},
	{
		title: 'TOTAL PRICE',
		dataIndex: 'totalPrice',
		key: 'totalPrice',
		responsive: ['sm'],
	},
	{
		title: 'ACTION',
		key: 'action',
		responsive: ['sm'],
		render: (data) => {
			return (
				<>
					<EditOutlined />
					<DeleteOutlined />
				</>
			);
		},
	},
];
