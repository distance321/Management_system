import React, { PureComponent } from 'react';
import { Dropdown, Menu, Icon } from 'antd';
import AmendModal from './amendModal'
import { connect } from 'dva';
@connect(({login}) => ({
	resetSuccess: login.resetSuccess,
	userId : login.userId
}))
class RightContent extends PureComponent {
	state = { 
		modelVisible: false,
		userName: '' 
	}

	componentDidMount(){
		const userName = sessionStorage.getItem('username')
		this.setState({
			userName : userName
		})
	}

	onClick = ({ key }) => {
		const { dispatch } = this.props;
		if (key === 'logout') {
			sessionStorage.removeItem('token')
			sessionStorage.removeItem('username')
			sessionStorage.removeItem('per')
			dispatch({
				type: 'login/logout'
			});
		}
	};

	resetPassword = () => {
		this.setState({
			modelVisible: true
		})
	}

	onCloseModal = () => {
		this.setState({
			modelVisible: false
		});
	};

	onSavePassword = (newPassword) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'login/resetPwd',
			payload: {username : sessionStorage.getItem('username'), password: newPassword}
		})
	}

	componentDidUpdate() {
		if (this.props.resetSuccess) {
			this.setState({
				modelVisible: false
			});
		}
	}

	render() {
		const DropMenus = (
			<Menu onClick={this.onClick}>
				<Menu.Item key="change_password" onClick={this.resetPassword}>修改密码</Menu.Item>
				<Menu.Item key="logout">退出</Menu.Item>
			</Menu>
		);
		
		return (
			<div style={{float: 'right'}}>	
				<AmendModal
					visible={this.state.modelVisible}
					onClose={this.onCloseModal}
					style={{ top: 20 }}
					onSave={this.onSavePassword}
				/>		
				<Dropdown overlay={DropMenus}>
					<a><Icon type="user" style={{padding:'18px 10px',fontSize:'24px'}}/>{sessionStorage.getItem('username')}</a>
				</Dropdown>
			</div>
		);
	}
}

export default RightContent;
