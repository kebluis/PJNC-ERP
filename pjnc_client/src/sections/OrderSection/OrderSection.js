import React, { useEffect, useState } from 'react';
import './OrderSection.css';

import Hotkeys from 'react-hot-keys';
import { Card, message, Form, Row, Col } from 'antd';

import GenericButton from '../../components/GenericButton';
import GenericTable from '../../components/table/GenericTable';
import GenericModal from '../../components/modal/GenericModal';
import Input from '../../components/InputControl';

import orderTableModel from '../../models/orderTableModel';
import { newOrderForm, newOrderTable } from '../../models/newOrderModel';

import { getOrder, postOrder, putOrder } from '../../services/ordersConsume';
import { getCustomer } from '../../services/customersConsume';
import { getProduct } from '../../services/productsConsume';
import moment from 'moment';

const OrderSection = () => {
	const [orderData, setOrderData] = useState([]);
	const [editFlag, setEditFlag] = useState(false);
	const [customerData, setCustomerData] = useState([]);
	const [productData, setProductData] = useState([]);
	const [showCreate, setShowCreate] = useState(false);
	const [listOrder, setListOrder] = useState({
		customerName: null,
		location: null,
		deliveryDate: null,
		unit: null,
		item: null,
		customerPrice: null,
		totalPrice: null,
		status: 'Processing',
	});
	const [options, setOptions] = useState({});
	const [newOrderData, setNewOrderData] = useState([]);

	const statusOptions = [
		{ key: 0, label: 'Preparing' },
		{ key: 1, label: 'Delivering' },
		{ key: 2, label: 'Paid' },
		{ key: 3, label: 'Partially Paid' },
		{ key: 4, label: 'Return' },
	];

	useEffect(() => {
		getOrderData();
		getProductData();
	}, []);

	useEffect(() => {
		if (showCreate) {
			getCustomer().then((res) => {
				setCustomerData(res.data);
				setOptions((prev) => {
					return {
						...prev,
						customerName: res.data.map((item, i) => {
							return { key: i, label: item.customerName };
						}),
					};
				});

				setOptions((prev) => {
					return {
						...prev,
						item: productData.map((item, i) => {
							return { key: i, label: item.productName };
						}),
					};
				});
			});
		} else {
			setListOrder((prev) => {
				return {
					...prev,
					customerName: null,
					unit: null,
					item: null,
					customerPrice: null,
					totalPrice: null,
					deliveryDate: null,
					location: null,
					status: 'Processing',
				};
			});
			if (!editFlag) {
				setNewOrderData([]);
			}
		}
	}, [showCreate]);

	useEffect(() => {
		setListOrder((prev) => {
			return {
				...prev,
				unit: null,
				item: null,
				customerPrice: null,
				totalPrice: null,
			};
		});
		if (!editFlag) {
			setNewOrderData([]);
		}
	}, [listOrder.customerName]);

	const getOrderData = () => {
		getOrder().then((res) => {
			const orderData = [];
			res.data.map((order) => {
				return orderData.push({
					...order,
					deliveryDate: moment(order.deliveryDate).format(
						'MMM DD YYYY, h:mm a'
					),
					customerId: order.customer._id,
					customerName: order.customer.customerName,
					location: order.customer.location,
				});
			});
			setOrderData(orderData);
		});
	};

	const getProductData = () => {
		getProduct().then((res) => {
			setProductData(res.data);
		});
	};

	const sortLatestToTop = (arr) => {
		return arr.reduceRight(function (previous, current) {
			previous.push(current);
			return previous;
		}, []);
	};
	const changeStatus = (e) => {
		console.log(orderData);
		console.log(customerData);
		console.log(listOrder);
		console.log(newOrderData);
		setListOrder((prev) => {
			return {
				...prev,
				status: statusOptions[e].label,
			};
		});
	};
	const listNewOrder = (e, comp) => {
		setListOrder((prev) => {
			return {
				...prev,
				customerName:
					comp.dataIndex === 'customerName'
						? customerData.map((cst) => cst.customerName)[e]
						: prev.customerName,
				item: comp.dataIndex === 'item' ? options.item[e].label : prev.item,
				location:
					comp.dataIndex === 'customerName'
						? customerData.map((cst) => cst.location)[e]
						: prev.location,
				customerPrice:
					comp.dataIndex === 'item'
						? customerData.filter(
								(cst) => cst.customerName === listOrder.customerName
						  )[0]?.customerPrice
							? customerData.filter(
									(cst) => cst.customerName === listOrder.customerName
							  )[0]?.customerPrice[options.item[e].label]?.price ??
							  productData[e].originalPrice
							: productData[e].originalPrice
						: prev.customerPrice,
				unit: comp.dataIndex === 'unit' ? e : prev.unit,
				totalPrice:
					comp.dataIndex === 'unit' && prev.customerPrice
						? e * Number(prev.customerPrice)
						: comp.dataIndex === 'item' && prev.unit
						? customerData.filter(
								(cst) => cst.customerName === listOrder.customerName
						  )[0]?.customerPrice
							? (customerData.filter(
									(cst) => cst.customerName === listOrder.customerName
							  )[0]?.customerPrice[options.item[e].label]?.price ??
									productData[e].originalPrice) * prev.unit
							: productData[e].originalPrice * prev.unit
						: null,
				deliveryDate:
					comp.dataIndex === 'deliveryDate'
						? e?._d ?? new Date()
						: prev.deliveryDate ?? new Date(),
			};
		});
		console.log(productData);
	};

	const addToTable = (event) => {
		console.log(options);
		const validation = Object.keys(listOrder).map((order) => {
			return listOrder[order] === null;
		});
		if (event.keyCode !== 13 && event.type !== 'click') {
			return;
		}
		if (validation.includes(true)) {
			return message.error('There are fields missing');
		} else {
			console.log(newOrderData);
			setNewOrderData((prev) => [...prev, listOrder]);
			return setListOrder((prev) => {
				return {
					...prev,
					unit: null,
					item: null,
					customerPrice: null,
					totalPrice: null,
				};
			});
		}
	};

	const buildPayload = () => {
		let total = 0;
		return {
			_id: listOrder._id ?? null,
			totalPrice: newOrderData.map((item) => {
				return (total += Number(item.totalPrice));
			})[newOrderData.length - 1],
			amountPaid: 0,
			deliveryDate: listOrder.deliveryDate,
			status: listOrder.status ?? 'Processing',
			customer:
				customerData[
					customerData.findIndex(
						(item) => item.customerName === listOrder.customerName
					)
				]._id,
			order: newOrderData.map((item) => {
				return {
					productName: item.item,
					unit: item.unit,
					totalPrice: item.totalPrice,
				};
			}),
		};
	};

	const postNewOrder = () => {
		console.log(orderData);
		console.log(customerData);
		console.log(listOrder);
		console.log(newOrderData);
		const payload = buildPayload();
		console.log(payload);
		postOrder(payload).then((res) => {
			console.log(res);
			getOrderData();
			setShowCreate(false);
			setEditFlag(false);
		});
	};

	const updateOrder = () => {
		const payload = buildPayload();
		console.log(payload);
		putOrder(payload._id, payload).then((res) => {
			getOrderData();
			setShowCreate(false);
		});
	};

	const onClickOrder = (event, data, index) => {
		setShowCreate(true);
		setEditFlag(true);
		setListOrder((prev) => {
			return {
				...prev,
				_id: data._id,
				customerName: data.customerName,
				location: data.location,
				deliveryDate: new Date(data.deliveryDate),
				status: data.status,
			};
		});
		setNewOrderData([
			...data.order.map((item) => {
				return {
					customerName: data.customerName,
					customerPrice: data.customer.customerPrice
						? data.customer.customerPrice[item.productName]?.price
						: productData[
								productData.findIndex(
									(prd) => prd.productName === item.productName
								)
						  ].originalPrice,
					location: data.location,
					deliveryDate: new Date(data.deliveryDate),
					unit: item.unit,
					item: item.productName,
					totalPrice: item.totalPrice,
				};
			}),
		]);
	};

	const onPrintOrder = (e) => {
		console.log('Print Receipt');
	};

	const deleteOrder = (data) => {
		setNewOrderData(newOrderData.filter((item) => item !== data));
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
					title={editFlag ? 'Modify Order' : 'Create New Order'}
					show={showCreate}
					handleCancel={() => {
						setShowCreate(false);
						setEditFlag(false);
					}}
					handleOk={() => (!editFlag ? postNewOrder() : updateOrder())}
					disabledSave={newOrderData.length === 0}>
					<Form>
						<Row gutter={100}>
							{newOrderForm.map((comp, i) => {
								return (
									<Col span={6} key={i} className="modal-margin">
										<label>{comp.label}</label>
										<br />
										<Input
											style={{ width: '100%' }}
											data={listOrder}
											dataIndex={comp.dataIndex}
											type={comp.type}
											options={options[comp.dataIndex]}
											changed={(e) => listNewOrder(e, comp)}
											autoSubmit={addToTable}
										/>
									</Col>
								);
							})}
						</Row>
					</Form>
					<div className="order-create">
						<span className="space_separator">
							<label>Status</label>
							<Input
								data={listOrder}
								dataIndex="status"
								type="select"
								options={[
									{ key: 0, label: 'Preparing' },
									{ key: 1, label: 'Delivering' },
									{ key: 2, label: 'Paid' },
									{ key: 3, label: 'Partially Paid' },
									{ key: 4, label: 'Return' },
								]}
								changed={(e) => changeStatus(e)}
								disabled={!editFlag}
							/>
						</span>
						<span style={{ margin: 'auto 0 8px 0' }}>
							<GenericButton click={addToTable}>+ ADD</GenericButton>
						</span>
					</div>
					<GenericTable
						columns={newOrderTable(deleteOrder)}
						data={sortLatestToTop(newOrderData)}
						pagination={{
							defaultPageSize: 3,
							pageSize: 3,
							size: 'small',
						}}
						click={(e, record, index) => {
							console.log(record);
						}}
					/>
				</GenericModal>
				<Card className="order-container">
					<div style={{ justifyContent: 'end' }} className="order-create">
						<GenericButton
							click={() => {
								setShowCreate(true);
							}}>
							+ Create Order
						</GenericButton>
					</div>
					<div>
						<GenericTable
							click={onClickOrder}
							columns={orderTableModel(onPrintOrder)}
							data={orderData}
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
export default OrderSection;
