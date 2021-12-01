import React, { useEffect, useState } from 'react';
import './OrderSection.css';

import Hotkeys from 'react-hot-keys';
import { Card, message } from 'antd';

import GenericButton from '../../components/GenericButton';
import GenericTable from '../../components/table/GenericTable';
import GenericModal from '../../components/modal/GenericModal';

import orderTableModel from '../../models/orderTableModel';
import { newOrderForm, newOrderTable } from '../../models/newOrderModel';

import { getOrder, postOrder } from '../../services/ordersConsume';
import { getCustomer } from '../../services/customersConsume';
import moment from 'moment';

const OrderSection = () => {
	const [orderData, setOrderData] = useState([]);
	const [customerData, setCustomerData] = useState([]);
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
			});
		}
	}, [showCreate]);

	const listNewOrder = (e, comp) => {
		return setListOrder((prev) => {
			return {
				...prev,
				[comp.dataIndex]:
					comp.type === 'select'
						? comp.options[e].label
						: comp.type === 'calendar' || comp.type === 'time'
						? e?._d ?? moment(new Date())
						: e,
			};
		});
	};

	const addToTable = (event) => {
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
					customerData={customerData}
					show={showCreate}
					handleCancel={() => setShowCreate(false)}
					handleOk={() => postNewOrder()}
					changeHandler={(e, comp) => listNewOrder(e, comp)}
					formContent={newOrderForm}
					valueHolder={listOrder}
					onSubmit={addToTable}>
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
