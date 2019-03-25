import React, { PureComponent } from 'react';
import { Input, Modal, Form } from 'antd';
import { RegEmail } from '@/constants/commonData';

const formItemLayout = {
	labelCol: {
		xs: { span: 6 }
	},
	wrapperCol: {
		xs: { span: 18 }
	}
};

export const Users = {
	edit: Symbol('edit'),
	add: Symbol('add')
};

@Form.create()
class UserModal extends PureComponent {
	state = {
		originUser: {}
	};

	//获取新的数据和组件状态
	componentWillReceiveProps(nextProps){
		if(nextProps.originUser !== this.state.originUser){
			let originUser = nextProps.originUser
			this.setState({
				originUser : originUser
			})
		}
	}
	//确认添加方法
	onClickSave = () => {
		const {
			onSave,
			handlevisible,
			form: { validateFieldsAndScroll }
		} = this.props;
		validateFieldsAndScroll((err, values) => {
			if (!err) {//打印输入表单的值
				handlevisible()
				onSave(values);
				// console.log('Received values of form(Save): ', values);
			}
		});
	};
	//确认修改方法
	onClickEdit = () => {
		const {
			onEdit,
			handlevisible,
			form: { validateFieldsAndScroll }
		} = this.props;
		validateFieldsAndScroll((err, values) => {
			if (!err) {//打印输入表单的值
				handlevisible()
				onEdit(values);
				// console.log('Received values of form(Edit): ', values);
			}
		});
	};

	render() {
		const { editType, onClose, visible, form } = this.props;
		const isEdit = editType === Users.edit; 
		const { getFieldDecorator } = form;
		const originUser = this.state.originUser
		return (
			<Modal
				title={isEdit ? '编辑用户' : '添加用户'}
				visible={ visible}
				onCancel={onClose}
				style={{ top: 20 }}
				onOk={isEdit ? this.onClickEdit : this.onClickSave}
				maskClosable={false}
				destroyOnClose
			>
				<Form layout="vertical">
					<Form.Item {...formItemLayout} label="用户名">
						{getFieldDecorator('username', {
							rules: [
								{
									required: true,
									message: '请输入用户名'
								}
							],
							initialValue : isEdit ? originUser.username : ''
						})(<Input />)}
					</Form.Item>
                    <Form.Item {...formItemLayout} label="邮箱">
						{getFieldDecorator('email', {
							rules: [
								{
									required: false,
									message: '请输入正确的邮箱',
									pattern: RegEmail
								}
							],
							initialValue : isEdit ? originUser.email : ''
						})(<Input />)}
					</Form.Item>
					{isEdit ? '' : <Form.Item {...formItemLayout} label="用户密码">
						{getFieldDecorator('password', {
							rules: [
								{
									required: true,
									message: '请输入用户密码'
								}
							],
						})(<Input.Password/>)}
					</Form.Item>}
				</Form>
			</Modal>
		);
	}
}

export default UserModal;
