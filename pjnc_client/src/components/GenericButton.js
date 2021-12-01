import { Button } from 'antd';

const GenericButton = ({ children, click }) => {
	return (
		<Button type="primary" shape="round" size={'small'} onClick={click}>
			{children}
		</Button>
	);
};
export default GenericButton;
