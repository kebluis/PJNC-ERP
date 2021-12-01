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
			<Form>
				<Row gutter={100}>
					{formContent.map((comp, i) => {
						return (
							<Col span={6} key={i} className="modal-margin">
								<label>{comp.label}</label>
								<Input
									data={valueHolder}
									dataIndex={comp.dataIndex}
									type={comp.type}
									options={comp.options ?? null}
									changed={(e) => changeHandler(e, comp)}
									autoSubmit={onSubmit}
								/>
							</Col>
						);
					})}
				</Row>
			</Form>
			{children}
		</Modal>
	);
};

export default GenericModal;
