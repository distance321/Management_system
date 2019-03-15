import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import styles from './index.css'
const { Sider } = Layout;
@connect(({ menus, routing }) => ({
	menuItems: menus.menuItems,
	collapsed: menus.collapsed,
	pathname: routing.location.pathname
}))
class SiderMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			openKeys: []
		};
		this.onOpenChange = this.onOpenChange.bind(this);
	}

	onOpenChange(newOpenKeys) {
		const { openKeys } = this.state;
		if (newOpenKeys.length > 1) {
			this.setState({ openKeys: newOpenKeys.filter(x => !openKeys.includes(x)) });
		} else {
			this.setState({ openKeys: newOpenKeys });
		}
	}

	
	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

	render() {
		const { SubMenu } = Menu;
		const { menuItems, pathname, collapsed } = this.props;
		return (
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
			>
				<div className={styles.logo} />
				<Menu
					mode="inline"
					openKeys={this.state.openKeys}
					onOpenChange={this.onOpenChange}
					theme="dark"
					selectedKeys={[pathname]}
				>
					{menuItems.map(item => (
						<SubMenu key={item.key} title={item.title}>
							{item.subItems.map(subItem => (
								<Menu.Item key={subItem.url}>
									<Link to={subItem.url}>{subItem.title}</Link>
								</Menu.Item>
							))}
						</SubMenu>
					))}
				</Menu>
			</Sider>
		);
	}
}

export default SiderMenu;
