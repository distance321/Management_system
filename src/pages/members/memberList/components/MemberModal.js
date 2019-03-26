import React, { PureComponent } from 'react';
import { Input, Modal, Form, DatePicker, Select } from 'antd';
import moment from 'moment'
import { RegTel } from '@/constants/commonData';
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        xs: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 12 }
    }
};

@Form.create()
class MemberModal extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            originMember: {}
        }
    }

    static getDerivedStateFromProps(nextProps,state){
		if(nextProps.originMember !== state.originMember){
			let originMember = nextProps.originMember
			return{
				originMember : originMember
			}
		}
		return null
	}

    onClickSave = () => {
        const {
            onEdit,
            handlevisible,
            form: { validateFieldsAndScroll }
        } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                onEdit(values)
                handlevisible()
            }
        })
    }

    render() {
        const { onClose, visible, form } = this.props;
        const { originMember } = this.state
        const { getFieldDecorator } = form;
        let fileds = [
            {
                title: '会员卡号',
                dataIndex: 'cardNumber'
            },
            {
                title: '姓名',
                dataIndex: 'name'
            },
        ]
        return (
            <>
                <Modal 
                    title={'编辑会员信息'}
                    visible={visible}
                    onCancel={onClose}
                    style={{ top: 20 }}
                    onOk={this.onClickSave}
                    maskClosable={false}
                    destroyOnClose
                >
                    <Form layout="horizontal">
                        {fileds.map(field => (
                            <Form.Item key={field.title} {...formItemLayout} label={field.title}>
                                {getFieldDecorator(field.dataIndex, {
                                    rules: [
                                        {
                                            required: true,
                                            message: `请输入${field.title}`
                                        }
                                    ],
                                    initialValue: originMember[field.dataIndex]
                                })(<Input />)}
                            </Form.Item>
                        ))}
                        <Form.Item {...formItemLayout} label="联系方式">
						{getFieldDecorator('tel', {
							rules: [
								{
									required: true,
									message: '请输入正确的联系方式',
									pattern: RegTel
								}
							],
							initialValue : originMember.tel
						})(<Input />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="会员类别">
                            {getFieldDecorator('category', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择会员类别',
                                        whitespace: true
                                    }
                                ],
                                initialValue: originMember.category
                            })(
                                <Select placeholder="请选择员工类别">
                                    <Option value={'普通会员'}>普通会员</Option>
                                    <Option value={'黄金会员'}>黄金会员</Option>
                                    <Option value={'铂金会员'}>铂金会员</Option>
                                    <Option value={'钻石会员'}>钻石会员</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}

export default MemberModal