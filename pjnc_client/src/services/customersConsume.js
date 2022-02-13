import axios from 'axios';

export function getCustomer() {
	return axios.get(`${process.env.REACT_APP_SERVICE_URL}/customers`);
}

export function postCustomer(payload) {
	return axios.post(`${process.env.REACT_APP_SERVICE_URL}/customers`, payload);
}

export function putCustomer(id, payload) {
	return axios.put(
		`${process.env.REACT_APP_SERVICE_URL}/customer/${id}`,
		payload
	);
}

export function deleteCustomer(id) {
	return axios.put(
		`${process.env.REACT_APP_SERVICE_URL}/customer/delete/${id}`
	);
}
