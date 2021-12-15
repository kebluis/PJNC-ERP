import { Select } from 'antd';
import './componentStyles.css';

const { Option } = Select;

const GenericDropdown = ({ options, selected, changed, focus, disabled }) => {
	return (
		<Select
			onClick={(event) => {
				event.stopPropagation();
			}}
			showSearch
			filterOption={(input, option) =>
				option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
			className="full-width"
			autoFocus={focus}
			value={selected}
			onChange={changed}
			disabled={disabled ?? false}>
			{options.length > 0 &&
				options.map((data) => {
					return <Option value={data.key}>{data.label}</Option>;
				})}
		</Select>
	);
};

export default GenericDropdown;
