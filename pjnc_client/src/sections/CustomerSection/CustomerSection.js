import React, { useEffect, useState } from 'react';
import './CustomerSection.less';
import Hotkeys from 'react-hot-keys';
import GenericModal from '../../components/modal/GenericModal';
import { Card, message, Form, Row, Col, Typography } from 'antd';

import GenericButton from '../../components/GenericButton';
import GenericTable from '../../components/table/GenericTable';
import {
	getCustomer,
	postCustomer,
	putCustomer,
} from '../../services/customersConsume';
import { getProduct } from '../../services/productsConsume';
import customerTableModel from '../../models/customerTableModel';
import {
	newCustomerForm,
	specialPriceTbl,
} from '../../models/newCustomerModel';
import Input from '../../components/InputControl';

import { PrinterOutlined } from '@ant-design/icons';

const CustomerSection = () => {
	const [showCreate, setShowCreate] = useState(false);
	const [editFlag, setEditFlag] = useState(false);
	const [customerData, setCustomerData] = useState([]);
	const [productData, setProductData] = useState([]);
	const [customerTbl, setCustomerTbl] = useState([]);
	const [listCustomer, setListCustomer] = useState({
		_id: null,
		customerName: null,
		location: null,
		productName: null,
		customerPrice: null,
	});
	const [newSpecialPrice, setNewSpecialPrice] = useState([]);

	useEffect(() => {
		getProduct().then((res) => {
			const customerTable = [
				...customerTableModel(),
				...res.data.map((item) => {
					return {
						dataIndex: item.productName.replace(' ', ''),
						key: item.productName.replace(' ', ''),
						responsive: ['sm'],
						title: item.productName.toUpperCase(),
					};
				}),
				{
					title: 'ACTION',
					key: 'action',
					responsive: ['sm'],
					width: '5%',
					// width: 200,
					fixed: 'right',
					render: (text) => (
						<div style={{ wordWrap: 'break-word' }}>
							<PrinterOutlined
								onClick={(e) => {
									e.stopPropagation();
									// onPrint(data);
								}}
							/>
						</div>
					),
				},
			];
			setCustomerTbl(customerTable);
			setProductData(res.data);
			getCustomerData(res.data);
		});
	}, []);

	const getCustomerData = (products) => {
		getCustomer().then((res) => {
			const data = res.data.map((cst) => {
				return {
					...cst,
					...products.reduce((prev, item) => {
						return Object.assign(prev, {
							[item.productName.replace(' ', '')]: cst.customerPrice
								? cst.customerPrice[item.productName]?.price ??
								  item.originalPrice
								: item.originalPrice,
						});
					}, {}),
				};
			});

			setCustomerData(data);
		});
	};

	const addNewPrice = () => {
		console.log(productData);
		setNewSpecialPrice((prev) => {
			return [
				...prev,
				{
					productName: listCustomer.productName,
					customerPrice: listCustomer.customerPrice,
				},
			];
		});
		setListCustomer((prev) => {
			return {
				...prev,
				productName: null,
				customerPrice: null,
			};
		});
	};
	const buildPayload = () => {
		let customerPrice = {};
		newSpecialPrice.forEach((item) => {
			customerPrice = {
				...customerPrice,
				[item.productName]: {
					label: item.productName,
					price: item.customerPrice,
				},
			};
		});

		return {
			_id: listCustomer._id ?? null,
			customerName: listCustomer.customerName,
			location: listCustomer.location,
			customerPrice,
		};
	};

	const postNewCustomer = () => {
		console.log(listCustomer);
		console.log(newSpecialPrice);
		const payload = buildPayload();
		postCustomer(payload).then((res) => {
			console.log(res);
			getCustomerData(productData);
			setShowCreate(false);
			setEditFlag(false);
			setNewSpecialPrice([]);
			setListCustomer({
				_id: null,
				customerName: null,
				location: null,
				productName: null,
				customerPrice: null,
			});
		});
	};

	const updateCustomer = () => {
		const payload = buildPayload();
		console.log(payload);
		putCustomer(payload._id, payload).then((res) => {
			getCustomerData(productData);
			setShowCreate(false);
		});
	};

	const deleteSpecialPrice = (data) => {
		setNewSpecialPrice((prev) => {
			return prev.filter((item) => item !== data);
		});
	};

	const modifyCustomer = (event, data, index) => {
		setEditFlag(true);
		setShowCreate(true);
		setListCustomer({
			_id: data._id,
			customerName: data.customerName,
			location: data.location,
		});
		setNewSpecialPrice(
			productData
				.map((item) => item.productName.replace(' ', ''))
				.map((item) => {
					return {
						productName: item,
						customerPrice: data[item],
					};
				})
				.filter((item) => {
					index = productData.findIndex(
						(find) => find.productName.replace(' ', '') === item.productName
					);
					return item.customerPrice !== productData[index].originalPrice;
				})
		);
	};

	return (
		<>
			<Hotkeys
				keyName="c"
				onKeyDown={(key, event, handle) => {
					event.preventDefault();
					setShowCreate(true);
				}}>
				<GenericModal
					title={editFlag ? 'Modify Customer Details' : 'Create New Customer'}
					show={showCreate}
					handleCancel={() => {
						setShowCreate(false);
						setEditFlag(false);
					}}
					handleOk={
						() => (!editFlag ? postNewCustomer() : updateCustomer())
						// postNewCustomer()
						// console.log(editFlag)
					}>
					<Form>
						<Row gutter={100}>
							<Col span={12}>
								<Row gutter={100}>
									{newCustomerForm.map((comp, i) => {
										return (
											<Col span={12} key={i} className="modal-margin">
												<label>{comp.label}</label>
												<Input
													data={listCustomer}
													dataIndex={comp.dataIndex}
													type={comp.type}
													options={[
														...(comp.dataIndex === 'productName'
															? productData.map((item) => {
																	return {
																		label: item.productName,
																		key: item.productName,
																	};
															  })
															: []),
													]}
													changed={(e) =>
														setListCustomer((prev) => {
															return {
																...prev,
																[comp.dataIndex]: e.target?.value ?? e,
															};
														})
													}
													// autoSubmit={addToTable}
												/>
											</Col>
										);
									})}
								</Row>
								<div style={{ textAlign: 'end' }}>
									<GenericButton click={addNewPrice}>
										+ Add Product
									</GenericButton>
								</div>
								<br />
								<Typography>
									*** ALL UNADDED PRODUCTS WILL HAVE THE DEFAULT PRICE VALUE.
								</Typography>
							</Col>
							<Col span={12}>
								<GenericTable
									click={(e, r, i) => {
										console.log(r);
									}}
									columns={specialPriceTbl(deleteSpecialPrice)}
									data={newSpecialPrice}
									pagination={{
										defaultPageSize: 3,
										pageSize: 3,
										size: 'small',
									}}
								/>
							</Col>
						</Row>
					</Form>
				</GenericModal>
				<Card className="customer-container">
					<div style={{ justifyContent: 'end' }} className="order-create">
						<GenericButton
							click={() => {
								setShowCreate(true);
							}}>
							+ New Customer
						</GenericButton>
					</div>
					<div>
						<GenericTable
							click={modifyCustomer}
							columns={customerTbl}
							data={customerData}
							scroll={{ x: 2500 }}
							pagination={{
								defaultPageSize: 4,
								pageSize: 4,
								size: 'small',
							}}
						/>
					</div>
				</Card>
			</Hotkeys>
		</>
	);
};
export default CustomerSection;
