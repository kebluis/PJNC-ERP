import axios from 'axios';

export function getProduct() {
	return axios.get(`${process.env.REACT_APP_SERVICE_URL}/products`);
}

export function postProduct(payload) {
	return axios.post(`${process.env.REACT_APP_SERVICE_URL}/products`, payload);
}

export function putProduct(id, payload) {
	return axios.put(
		`${process.env.REACT_APP_SERVICE_URL}/product/${id}`,
		payload
	);
}

export function deleteProduct(id) {
	return axios.delete(`${process.env.REACT_APP_SERVICE_URL}/product/${id}`);
}
