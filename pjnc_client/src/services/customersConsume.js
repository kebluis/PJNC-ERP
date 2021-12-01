import axios from 'axios';

export function getCustomer() {
	return axios.get(`${process.env.REACT_APP_SERVICE_URL}/customers`);
}

export function postCustomer(payload) {
	return axios.post(`${process.env.REACT_APP_SERVICE_URL}/customers`, payload);
}

export function putCustomer(id) {
	return axios.put(`${process.env.REACT_APP_SERVICE_URL}/customer/${id}`);
}

export function deleteCustomer(id) {
	return axios.delete(`${process.env.REACT_APP_SERVICE_URL}/customer/${id}`);
}
