import React from 'react';
import Select from './GenericDropDown';
import { Input, TimePicker, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

const InputControl = (props) => {
	const { type, options, data, dataIndex, changed, autoSubmit, disabled } =
		props;
	let input = null;
	switch (type) {
		case 'select':
			input = (
				<Select
					focus={dataIndex === 'customerName'}
					selected={data[dataIndex]}
					options={options ?? []}
					changed={changed}
					onKeyDown={autoSubmit}
					value={data}
					disabled={disabled}
				/>
			);
			break;

		case 'input':
			input = (
				<Input
					type="text"
					onChange={changed}
					{...props}
					onKeyDown={autoSubmit}
					value={data[dataIndex]}
				/>
			);
			break;
		case 'number':
			input = (
				<InputNumber
					onChange={changed}
					style={{ width: 'inherit' }}
					onKeyDown={autoSubmit}
					value={data[dataIndex]}
				/>
			);
			break;
		case 'amount':
			input = (
				<InputNumber
					style={{ width: 'inherit' }}
					min="0"
					step="0.50"
					onChange={changed}
					stringMode
					onKeyDown={autoSubmit}
				/>
			);
			break;
		case 'calendar':
			input = (
				<DatePicker
					className="full-width"
					onChange={changed}
					onKeyDown={autoSubmit}
					// defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
					value={
						data[dataIndex]
							? moment(new Date(data[dataIndex]))
							: moment(new Date())
					}
				/>
			);
			break;
		case 'time':
			input = (
				<TimePicker
					className="full-width"
					onChange={changed}
					onKeyDown={autoSubmit}
					value={
						data[dataIndex]
							? moment(new Date(data[dataIndex]))
							: moment(new Date())
					}
				/>
			);
			break;
		default:
			input = <div>{data[dataIndex]}</div>;
			break;
	}
	return input;
};

export default InputControl;
