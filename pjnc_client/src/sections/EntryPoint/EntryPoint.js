import React, { useEffect, useState } from 'react';
import './EntryPoint.css';
import { useAuth0 } from '@auth0/auth0-react';
import GenericButton from '../../components/GenericButton';
import { Spin, Space } from 'antd';

const EntryPoint = ({ children }) => {
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(isLoading);
	}, []);

	useEffect(() => {
		new Promise(function (resolve, reject) {
			setTimeout(resolve, 2000);
		}).then(function () {
			setLoading(false);
		});
	}, [loading]);

	return (
		<>
			{loading ? (
				<Space size="middle">
					<Spin size="large" />
				</Space>
			) : (
				<>
					{!isAuthenticated ? (
						<>
							<h1>Welcome to PJNC </h1>
							<GenericButton click={loginWithRedirect}>
								Login Here!
							</GenericButton>
						</>
					) : (
						<>{children}</>
					)}
				</>
			)}
		</>
	);
};

export default EntryPoint;
