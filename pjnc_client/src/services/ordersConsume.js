import axios from 'axios';

export function getOrder() {
	return axios.get(`${process.env.REACT_APP_SERVICE_URL}/orders`);
}

export function postOrder(payload) {
	return axios.post(`${process.env.REACT_APP_SERVICE_URL}/orders`, payload);
}

export function putOrder(id) {
	return axios.put(`${process.env.REACT_APP_SERVICE_URL}/order/${id}`);
}

export function deleteOrder(id) {
	return axios.delete(`${process.env.REACT_APP_SERVICE_URL}/order/${id}`);
}
