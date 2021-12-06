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

import { getOrder, postOrder } from '../../services/ordersConsume';
import { getCustomer } from '../../services/customersConsume';
import { getProduct } from '../../services/productsConsume';
import moment from 'moment';

const OrderSection = () => {
	const [orderData, setOrderData] = useState([]);
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
	});
	const [options, setOptions] = useState({});
	const [newOrderData, setNewOrderData] = useState([]);

	useEffect(() => {
		getOrder().then((res) => {
			const orderData = [];
			res.data.map((order) => {
				return orderData.push({
					...order,
					customerId: order.customer._id,
					customerName: order.customer.customerName,
					location: order.customer.location,
				});
			});
			setOrderData(orderData);
		});
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
				getProduct().then((res) => {
					setProductData(res.data);

					setOptions((prev) => {
						return {
							...prev,
							item: res.data.map((item, i) => {
								return { key: i, label: item.productName };
							}),
						};
					});
				});
			});
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
	}, [listOrder.customerName]);

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
					comp.dataIndex === 'deliveryDate' ? e._d : prev.deliveryDate,
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

	const postNewOrder = () => {
		console.log(orderData);
		console.log(customerData);
		console.log(listOrder);
		console.log(newOrderData);
		// const payload = {
		// 	_id: null,
		// 	customer:
		// }
		debugger;
		// return postOrder();
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
					title="Create New Order"
					show={showCreate}
					handleCancel={() => setShowCreate(false)}
					handleOk={() => postNewOrder()}>
					<Form>
						<Row gutter={100}>
							{newOrderForm.map((comp, i) => {
								return (
									<Col span={6} key={i} className="modal-margin">
										<label>{comp.label}</label>
										<Input
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
						<GenericButton click={addToTable}>+ ADD</GenericButton>
					</div>
					<GenericTable
						columns={newOrderTable}
						data={newOrderData}
						pagination={{
							defaultPageSize: 3,
							pageSize: 3,
							size: 'small',
						}}
					/>
				</GenericModal>
				<Card className="order-container">
					<div className="order-create">
						<GenericButton
							click={() => {
								setShowCreate(true);
							}}>
							+ Create Order
						</GenericButton>
					</div>
					<div>
						<GenericTable columns={orderTableModel} data={orderData} />
					</div>
				</Card>
			</Hotkeys>
		</>
	);
};
export default OrderSection;
