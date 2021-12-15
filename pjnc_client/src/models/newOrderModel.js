import { DeleteOutlined } from '@ant-design/icons';

export const newOrderForm = [
	{
		label: 'CUSTOMER NAME',
		dataIndex: 'customerName',
		type: 'select',
		options: 'customers',
	},
	{
		label: 'LOCATION',
		dataIndex: 'location',
		type: 'text',
		options: 'customers',
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
		options: 'products',
	},
	{
		label: 'CUSTOMER PRICE',
		dataIndex: 'customerPrice',
		type: 'text',
	},
	{
		label: 'TOTAL PRICE',
		dataIndex: 'totalPrice',
		type: 'text',
	},
];
export const newOrderTable = (onDelete) => {
	return [
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
						<DeleteOutlined
							onClick={(e) => {
								e.stopPropagation();
								onDelete(data);
							}}
						/>
					</>
				);
			},
		},
	];
};
