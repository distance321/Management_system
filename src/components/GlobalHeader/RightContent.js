import React, { PureComponent } from 'react';
import { Dropdown, Menu, Icon } from 'antd';

class RightContent extends PureComponent {

	render() {
		const DropMenus = (
			<Menu onClick={this.onClick}>
				<Menu.Item key="change_password" onClick={this.resetPassword}>修改密码</Menu.Item>
				<Menu.Item key="logout">退出</Menu.Item>
			</Menu>
		);
		
		return (
			<>			
				<Dropdown overlay={DropMenus}>
					<a><Icon type="user" style={{padding:'18px 10px',fontSize:'24px'}}/>admin</a>
				</Dropdown>
			</>
		);
	}
}

export default RightContent;
