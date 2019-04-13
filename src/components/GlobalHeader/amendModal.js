import React, { Component } from 'react';
import { Input, Modal, Form } from 'antd';

const formItemLayout = {
	labelCol: {
		xs: { span: 6 }
	},
	wrapperCol: {
		xs: { span: 16 }
	}
};

@Form.create()
class AmendModal extends Component {
	state = {
		confirmDirty: false,
		samePassword: false
	};
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	validateToComfirmPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirmPassword'], { force: true });
		}
		callback();
		this.setState({
			samePassword: false
		});
	};
	compareToNewPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (!value) {
			this.setState({
				samePassword: false
			});
		} else if (value !== form.getFieldValue('newPassword')) {
			callback('密码不一致');
			this.setState({
				samePassword: false
			});
		} else {
			this.setState({
				samePassword: true
			});
		}
	}
	// 密码一致时 确认按钮才可点击时
	onClickOk = () => {
		const { form, onSave } = this.props;
		onSave(form.getFieldValue('newPassword'));
	}
	render() {
		const { visible, onClose, form } = this.props
		const { getFieldDecorator } = form

		return (
			<Modal
				title='修改密码'
				okText="修改"
				cancelText="取消"
				okButtonProps={{disabled: !this.state.samePassword}}
				visible={visible}
				onCancel={onClose}
				style={{ top: 20 }}
				onOk={this.onClickOk}
				maskClosable={false}
				destroyOnClose
			>
				<Form layout="vertical">
					<Form.Item {...formItemLayout} label="新密码">
						{getFieldDecorator('newPassword', {
							rules: [
								{
									required: true,
									message: '请输入新密码'
								},
								{
									validator: this.validateToComfirmPassword,
								}
							]
						})(<Input type="password" />)}
					</Form.Item>
					<Form.Item {...formItemLayout} label="确认密码">
						{getFieldDecorator('confirmPassword', {
							rules: [
								{
									required: true,
									message: '请确认您的密码'
								},
								{
									validator: this.compareToNewPassword,
								}
							]
						})(<Input type="password" onBlur={this.handleConfirmBlur} />)}
					</Form.Item>
				</Form>
			</Modal>
		)
	}
}

export default AmendModal;