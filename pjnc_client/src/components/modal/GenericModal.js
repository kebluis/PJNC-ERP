import React, { useEffect, useRef } from 'react';
import './GenericModal.css';
import { Modal, Form, Row, Col } from 'antd';
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
}) => {
	return (
		<Modal
			width="75%"
			centered
			title={title}
			visible={show}
			onOk={handleOk}
			onCancel={handleCancel}>
			{children}
		</Modal>
	);
};

export default GenericModal;
