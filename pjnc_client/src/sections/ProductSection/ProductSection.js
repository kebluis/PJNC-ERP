import React, { useEffect, useState } from 'react';
import './ProductSection.less';
import Hotkeys from 'react-hot-keys';
import GenericModal from '../../components/modal/GenericModal';
import { Card, Form, Row, Col } from 'antd';

import GenericButton from '../../components/GenericButton';
import GenericTable from '../../components/table/GenericTable';
import {
	getProduct,
	postProduct,
	putProduct,
} from '../../services/productsConsume';

import { mainProductTable, newProductForm } from '../../models/productModels';
import Input from '../../components/InputControl';

const ProductSection = () => {
	const [showCreate, setShowCreate] = useState(false);
	const [editFlag, setEditFlag] = useState(false);
	const [productData, setProductData] = useState([]);
	const [listProduct, setListProduct] = useState({
		_id: null,
		productName: null,
		supplier: null,
		productStock: null,
		addProductStock: null,
		marketPrice: null,
		originalPrice: null,
	});
	const [newPrice, setNewPrice] = useState([]);

	useEffect(() => {
		getProductData();
	}, []);

	const getProductData = () => {
		return getProduct().then((res) => {
			setProductData(res.data);
		});
	};

	const buildPayload = () => {
		return {
			_id: listProduct._id ?? null,
			productName: listProduct.productName,
			supplier: listProduct.supplier,
			marketPrice: listProduct.marketPrice,
			originalPrice: listProduct.originalPrice,
			productStock: editFlag
				? Number(listProduct.productStock) + Number(listProduct.addProductStock)
				: listProduct.productStock,
		};
	};
	const deletePrice = (data) => {
		setNewPrice((prev) => {
			return prev.filter((item) => item !== data);
		});
	};
	const modifyProduct = (event, data, index) => {
		setEditFlag(true);
		setShowCreate(true);
		setListProduct({
			_id: data._id,
			productName: data.productName,
			supplier: data.supplier,
			productStock: data.productStock,
			addProductStock: null,
			marketPrice: data.marketPrice,
			originalPrice: data.originalPrice,
		});
	};

	const postNewProduct = () => {
		const payload = buildPayload();
		return postProduct(payload).then((res) => {
			console.log(res.data);
			setShowCreate(false);
			setListProduct({
				_id: null,
				productName: null,
				supplier: null,
				productStock: null,
				addProductStock: null,
				marketPrice: null,
				originalPrice: null,
			});
			setEditFlag(false);

			setProductData((prev) => {
				return [res.data, ...prev];
			});
		});
	};
	const updateProduct = () => {
		const payload = buildPayload();
		return putProduct(payload._id, payload).then((res) => {
			console.log(res.data);
			setShowCreate(false);
			setListProduct({
				_id: null,
				productName: null,
				supplier: null,
				productStock: null,
				addProductStock: null,
				marketPrice: null,
				originalPrice: null,
			});
			setEditFlag(false);
			// getProductData();
			const updateIndex = productData.findIndex(
				(item) => item._id === listProduct._id
			);
			const products = productData;
			products[updateIndex] = res.data;
			setProductData([...products]);
		});
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
					title={editFlag ? 'Modify Product Details' : 'Create New Product'}
					show={showCreate}
					handleCancel={() => {
						setShowCreate(false);
						setEditFlag(false);
					}}
					handleOk={() => {
						!editFlag ? postNewProduct() : updateProduct();
						// postNewCustomer();
						console.log(editFlag);
					}}>
					<Form>
						<Row gutter={100}>
							{newProductForm.map((comp, i) => {
								return (
									<Col span={12} key={i} className="modal-margin">
										<label>{comp.label}</label>
										<br />
										<Input
											data={listProduct}
											style={{ width: '100%' }}
											disabled={
												(comp.dataIndex === 'productStock' &&
													listProduct._id) ||
												(comp.dataIndex === 'addProductStock' &&
													!listProduct._id)
											}
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
												setListProduct((prev) => {
													return {
														...prev,
														[comp.dataIndex]: e?.target?.value ?? e,
													};
												})
											}
											// autoSubmit={addToTable}
										/>
									</Col>
								);
							})}
						</Row>
						<br />
					</Form>
				</GenericModal>
				<Card className="customer-container">
					<div style={{ justifyContent: 'end' }} className="order-create">
						<GenericButton
							click={() => {
								setListProduct({
									_id: null,
									productName: null,
									supplier: null,
									productStock: null,
									addProductStock: null,
									marketPrice: null,
									originalPrice: null,
								});
								setShowCreate(true);
							}}>
							+ New Product
						</GenericButton>
					</div>
					<div>
						<GenericTable
							click={modifyProduct}
							columns={mainProductTable()}
							data={productData}
							// scroll={{ x: 2500 }}
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
export default ProductSection;
