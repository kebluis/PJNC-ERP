import React, { useEffect, useRef } from 'react';
import './GenericModal.css';
import { Modal, Form, Row, Col, Button } from 'antd';
import Input from '../InputControl';

const GenericModal = ({
	show,
	handleOk,
	handleCancel,
	title,
	formContent,
	children,
	changeHandler,
	valueHolder,
	onSubmit,
	customerData,
	disabledSave,
}) => {
	return (
		<Modal
			width="75%"
			centered
			title={title}
			visible={show}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					Cancel
				</Button>,
				<Button
					disabled={disabledSave ?? false}
					key="submit"
					type="primary"
					onClick={handleOk}>
					Save
				</Button>,
			]}>
			{children}
		</Modal>
	);
};

export default GenericModal;
