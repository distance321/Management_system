import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Card, Table, Input, Divider, Popconfirm } from 'antd';
import UserModal, { Users } from './components/userModal'
import GroupTable from './components/groupTable'
import _ from 'lodash'
@connect(({ users }) => ({
	results: users.results,
	pagination: users.pagination,
	count: users.count
}))
class User extends PureComponent {
	state = {
		modelVisible: false,
		amendVisible: false,
		toTable: false,
		editUser: {},
		permissions: '',
		editType: '',
		searchVal: '',
		id: ''
	};

	componentDidMount() {
		window.scrollTo(0, 0)
		this.searchUsers();
	}
	//调用搜索接口
	searchUsers = params => {
		const { dispatch } = this.props;
		dispatch({
			type: 'users/fetchUsers',
			payload: params
		});
	};
	//点击切换页码
	onPageChange = ({ pageSize, current }) => {
		this.searchUsers({
			page_size: pageSize,
			page: current
		});
		const { dispatch } = this.props
		dispatch({
			type: 'users/changePage',
			payload: current
		})
	};
	//关闭弹出框
	onCloseModal = () => {
		this.setState({
			amendVisible: false,
			modelVisible: false
		});
	};
	//确认添加数据
	onSaveUser = values => {
		const { dispatch, user_permissions } = this.props;
		dispatch({
			type: 'users/create',
			payload: { userInfo: values, user_permissions: user_permissions }
		});
	};
	//确认修改数据
	onEditUser = values => {
		const { dispatch } = this.props;
		const { id } = this.state
		dispatch({
			type: 'users/update',
			payload: { userInfo: values, id: id }
		});
	};
	onEditGroup = values => {
		const { dispatch } = this.props;
		const { id, editUser } = this.state
		let userInfo = _.cloneDeep(editUser)
		userInfo.user_permissions = values
		dispatch({
			type: 'users/update',
			payload: { userInfo: userInfo, id: id }
		});
	}
	//model点击确认后关闭model
	handlevisible = () => {
		this.setState({
			modelVisible: false
		});
	}
	//添加人员
	onAddUser = () => {
		this.setState({
			modelVisible: true,
			editType: Users.add
		});
	};
	editRow = record => {
		this.setState({
			modelVisible: true,
			editType: Users.edit,
			editUser: record,
			id: record.id
		});
	};
	//点击删除按钮
	removeRow = id => {
		const { dispatch } = this.props;
		dispatch({
			type: 'users/removeById',
			payload: id
		});
	};
	//重设密码
	resetPassword = (id) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'login/getUserId'
		})
		this.setState({
			amendVisible: true,
			id: id
		})
	}
	onSavePassword = (newPassword) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'login/resetPwd',
			payload: newPassword
		})
	}
	// 密码重置成功就自动关闭modal
	componentDidUpdate() {
		if (this.props.resetSuccess) {
			this.setState({
				amendVisible: false
			});
		}
	}
	toTable = (record) => {
		this.setState({
			permissions: record.user_permissions,
			id: record.id,
			toTable: true
		})
	}
	back = () => {
		this.setState({
			toTable: false
		})
	}
	render() {
		const { results,count, pagination } = this.props
		const { permissions, editUser, editType, id, toTable } = this.state;
		const columns = [
			{
				title: '',
				dataIndex: 'index',
				align: 'center',
				width: 10,
				render: (text, record, index) => index + 1
			},
			{
				title: 'ID',
				dataIndex: 'id',
				width: 100,
				align: 'center',
				key: 'id'
			},
			{
				title: '用户名',
				dataIndex: 'username',
				align: 'center',
				key: 'username'
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				align: 'center',
				key: 'email'
			},
			{
				title: '操作',
				width: 400,
				align: 'center',
				render: (text, record) => {
					return (
						<span>
							<a onClick={() => this.editRow(record)}>编辑</a>
							<Divider type="vertical" />
							<Popconfirm title="是否要删除此行？" onConfirm={() => this.removeRow(record.id)}>
								<a>删除</a>
							</Popconfirm>
							<Divider type="vertical" />
							<a onClick={() => this.toTable(record)}>权限</a>
							<Divider type="vertical" />
							<a onClick={() => this.resetPassword(record.id)}>重置密码</a>
						</span>
					);
				}
			}
		]
		if (toTable) {
			return <GroupTable onEditGroup={this.onEditGroup} back={this.back} permissions={permissions} />
		}
		return (
			<>
				<UserModal
					visible={this.state.modelVisible}
					onClose={this.onCloseModal}
					onSave={this.onSaveUser}
					onEdit={this.onEditUser}
					id={id}
					handlevisible={this.handlevisible}
					editType={editType}
					originUser={editUser}
				/>
				<Row>
					<Card bordered={false}>
						<Table
							title={() => `共${count}条记录`}
							bordered
							rowKey={record => record.id}
							columns={columns}
							dataSource={results}
							onChange={this.onPageChange}
							pagination={{
								pageSize: pagination.pageSize,
								total: count
							}}
							size="small"
						/>
					</Card>
				</Row>
			</>
		)
	}
}


export default User;