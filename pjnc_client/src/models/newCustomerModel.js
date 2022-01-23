import { DeleteOutlined } from '@ant-design/icons';

export const newCustomerForm = [
	{
		label: 'CUSTOMER NAME',
		dataIndex: 'customerName',
		type: 'input',
	},
	{
		label: 'LOCATION',
		dataIndex: 'location',
		type: 'input',
	},
	{
		label: 'PRODUCT NAME',
		dataIndex: 'productName',
		type: 'select',
		options: 'products',
	},
	{
		label: 'CUSTOMER PRICE',
		dataIndex: 'customerPrice',
		type: 'input',
	},
];

export const specialPriceTbl = (onDelete) => {
	return [
		{
			title: 'PRODUCT NAME',
			dataIndex: 'productName',
		},
		{
			title: 'CUSTOMER PRICE',
			dataIndex: 'customerPrice',
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
