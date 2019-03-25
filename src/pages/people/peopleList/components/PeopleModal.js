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
class PeopleModal extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            originPeople: {}
        }
    }

    static getDerivedStateFromProps(nextProps,state){
		if(nextProps.originPeople !== state.originPeople){
			let originPeople = nextProps.originPeople
			return{
				originPeople : originPeople
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
                values.birthDate = moment(values.birthDate).format("YYYY-MM-DD")
                values.entryDate = moment(values.entryDate).format("YYYY-MM-DD")
                onEdit(values)
                handlevisible()
            }
        })
    }

    render() {
        const { onClose, visible, form } = this.props;
        const { originPeople } = this.state
        const { getFieldDecorator } = form;
        let fileds = [
            {
                title: '工号',
                dataIndex: 'workNumber'
            },
            {
                title: '姓名',
                dataIndex: 'name'
            },
            {
                title: '籍贯',
                dataIndex: 'county'
            },
        ]
        return (
            <>
                <Modal 
                    title={'编辑员工信息'}
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
                                    initialValue: originPeople[field.dataIndex]
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
							initialValue : originPeople.tel
						})(<Input />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="出生日期">
                            {getFieldDecorator('birthDate', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择出生日期'
                                    }
                                ],
                                initialValue: moment(originPeople.birthDate)
                            })(
                                <DatePicker  
                                    style={{width:'100%'}}  
                                    placeholder="请选择出生日期" 
                                    format="YYYY-MM-DD" 
                                />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="员工类别">
                            {getFieldDecorator('category', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择员工类别',
                                        whitespace: true
                                    }
                                ],
                                initialValue: originPeople.category
                            })(
                                <Select placeholder="请选择员工类别">
                                    <Option value={'实习'}>实习</Option>
                                    <Option value={'正式'}>正式</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="入职日期">
                            {getFieldDecorator('entryDate', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择入职日期' 
                                    }
                                ],
                                initialValue: moment(originPeople.entryDate)
                            })(
                                <DatePicker
                                    style={{width:'100%'}}  
                                    placeholder="请选择入职日期" 
                                    format="YYYY-MM-DD" 
                                />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}

export default PeopleModal