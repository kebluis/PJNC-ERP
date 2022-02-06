const customerColumns = () => {
	return [
		{
			title: 'CUSTOMER NAME',
			dataIndex: 'customerName',
			key: 'customerName',
			width: '5%',
			fixed: 'left',
			responsive: ['sm'],
			render: (text) => <div style={{ wordWrap: 'break-word' }}>{text}</div>,
		},
		{
			title: 'LOCATION',
			dataIndex: 'location',
			key: 'location',
			width: '5%',
			fixed: 'left',
			responsive: ['sm'],
			render: (text) => <div style={{ wordWrap: 'break-word' }}>{text}</div>,
		},
	];
};
export default customerColumns;
