import { DeleteOutlined } from '@ant-design/icons';

export const mainProductTable = () => {
	return [
		// {
		// 	title: 'PRODUCT ID',
		// 	dataIndex: '_id',
		// 	key: '_id',
		// 	responsive: ['sm'],
		// 	width: '5%',
		// 	// width: 200,
		// 	fixed: 'left',
		// 	render: (text) => <div style={{ wordWrap: 'break-word' }}>{text}</div>,
		// },
		{
			title: 'PRODUCT NAME',
			dataIndex: 'productName',
			key: 'productName',
			width: '30%',
			// width: 200,
			fixed: 'left',
			responsive: ['sm'],
			render: (text) => <div style={{ wordWrap: 'break-word' }}>{text}</div>,
		},
		{
			title: 'SUPPLIER',
			dataIndex: 'supplier',
			key: 'supplier',

			// width: 200,

			responsive: ['sm'],
		},
		{
			title: 'STOCK',
			dataIndex: 'productStock',
			key: 'productStock',

			// width: 200,
			responsive: ['sm'],
		},
		{
			title: 'SUPPLIER PRICE',
			dataIndex: 'originalPrice',
			key: 'originalPrice',
			width: '20%',
			// width: 200,
			fixed: 'right',
			responsive: ['sm'],
			render: (text) => <div style={{ wordWrap: 'break-word' }}>{text}</div>,
		},
		{
			title: 'SELLING PRICE',
			dataIndex: 'marketPrice',
			key: 'marketPrice',
			width: '20%',
			// width: 200,
			fixed: 'right',
			responsive: ['sm'],
			render: (text) => <div style={{ wordWrap: 'break-word' }}>{text}</div>,
		},
	];
};

export const newProductForm = [
	{
		label: 'PRODUCT NAME',
		dataIndex: 'productName',
		type: 'input',
	},
	{
		label: 'SUPPLIER',
		dataIndex: 'supplier',
		type: 'input',
	},
	{
		label: 'CURRENT STOCK',
		dataIndex: 'productStock',
		type: 'number',
	},
	{
		label: 'ADD STOCK',
		dataIndex: 'addProductStock',
		type: 'number',
	},
	{
		label: 'SUPPLIER PRICE',
		dataIndex: 'originalPrice',
		type: 'number',
	},
	{
		label: 'SELLING PRICE',
		dataIndex: 'marketPrice',
		type: 'number',
	},
];
