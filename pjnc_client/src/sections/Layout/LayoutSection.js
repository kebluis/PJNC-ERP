import React, { useState } from 'react';
import './LayoutSection.less';
import { useAuth0 } from '@auth0/auth0-react';
import { Layout, Menu, Avatar, Tooltip } from 'antd';
import {
	FileSearchOutlined,
	UserOutlined,
	CoffeeOutlined,
	LogoutOutlined,
	DollarOutlined,
} from '@ant-design/icons';
import OrderSection from '../OrderSection/OrderSection';
import CustomerSection from '../CustomerSection/CustomerSection';
import ProductSection from '../ProductSection/ProductSection';
import ExpenseSection from '../ExpenseSection/ExpenseSection';

const LayoutSection = () => {
	const { user, logout } = useAuth0();
	const { Header, Content, Sider } = Layout;
	const [collapsed, setCollapse] = useState(true);
	const [keySection, setKeySection] = useState('1');

	const setKey = (event) => {
		setKeySection(event.key);
	};

	return (
		<>
			<Layout className="layout-container" hasSider>
				<Sider
					className="sider-container"
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
						<Menu.Item key="4" icon={<DollarOutlined />} onClick={setKey}>
							Expense Section
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout
					className={`site-layout ${
						collapsed ? 'layout-detail-sider-off' : 'layout-detail-sider-on'
					}  `}>
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
							<h1 className="layout-content-title">
								{Number(keySection) === 1
									? 'Order Page'
									: Number(keySection) === 2
									? 'Customer Page'
									: 'Product Page'}
							</h1>

							{Number(keySection) === 1 && <OrderSection />}
							{Number(keySection) === 2 && <CustomerSection />}
							{Number(keySection) === 3 && <ProductSection />}
							{Number(keySection) === 4 && <ExpenseSection />}
						</div>
					</Content>
				</Layout>
			</Layout>
		</>
	);
};
export default LayoutSection;
