import { Select } from 'antd';
import './componentStyles.css';

const { Option } = Select;

const GenericDropdown = ({ options, selected, changed, focus }) => {
	return (
		<Select
			showSearch
			filterOption={(input, option) =>
				option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
			className="full-width"
			autoFocus={focus}
			defaultValue={selected}
			onChange={changed}>
			{options &&
				options.map((data) => {
					return <Option value={data.key}>{data.label}</Option>;
				})}
		</Select>
	);
};

export default GenericDropdown;
