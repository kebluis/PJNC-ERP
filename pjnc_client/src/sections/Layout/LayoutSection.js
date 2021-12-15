import React, { useState } from 'react';
import './LayoutSection.less';
import { useAuth0 } from '@auth0/auth0-react';
import { Layout, Menu, Avatar, Tooltip } from 'antd';
import {
	FileSearchOutlined,
	UserOutlined,
	CoffeeOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import OrderSection from '../OrderSection/OrderSection';
import CustomerSection from '../CustomerSection/CustomerSection';
import ProductSection from '../ProductSection/ProductSection';

const LayoutSection = () => {
	const { user, logout } = useAuth0();
	const { Header, Content, Sider } = Layout;
	const [collapsed, setCollapse] = useState(false);
	const [keySection, setKeySection] = useState('1');

	const setKey = (event) => {
		setKeySection(event.key);
	};

	return (
		<>
			<Layout className="layout-container">
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={() => setCollapse(!collapsed)}>
					<Menu theme="dark" defaultSelectedKeys={[keySection]} mode="inline">
						<Menu.Item key="1" icon={<FileSearchOutlined />} onClick={setKey}>
							Order Section
						</Menu.Item>
						<Menu.Item key="2" icon={<UserOutlined />} onClick={setKey}>
							Customer Section
						</Menu.Item>
						<Menu.Item key="3" icon={<CoffeeOutlined />} onClick={setKey}>
							Product Section
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="layout-header">
						{user.name}
						<Tooltip
							title={
								<div
									className="layout-logout"
									onClick={() => {
										logout();
									}}>
									<LogoutOutlined className="layout-icons" />
									Logout
								</div>
							}>
							<Avatar
								className="layout-avatar"
								size="large"
								src={user.picture}
							/>
						</Tooltip>
					</Header>
					<Content className="layout-content">
						<div>
							<h1 className="layout-content-title">Order Page</h1>

							{Number(keySection) === 1 && <OrderSection />}
							{Number(keySection) === 2 && <CustomerSection />}
							{Number(keySection) === 3 && <ProductSection />}
						</div>
					</Content>
				</Layout>
			</Layout>
		</>
	);
};
export default LayoutSection;
