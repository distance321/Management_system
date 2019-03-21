import React, { PureComponent } from 'react';
import { Input, Modal, Form, Select } from 'antd';
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        xs: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 18 }
    }
};

@Form.create()
class GoodModal extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            originGood: {}
        }
    }

    static getDerivedStateFromProps(nextProps,state){
		if(nextProps.originGood !== state.originGood){
			let originGood = nextProps.originGood
			return{
				originGood : originGood
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
        const { originGood } = this.state
        const { getFieldDecorator } = form;
        let fileds = [
            {
                title: '商品编号',
                dataIndex: 'serialNumber'
            },
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品总量',
                dataIndex: 'total'
            },
            {
                title: '商品价格',
                dataIndex: 'price'
            },
        ]
        return (
            <>
                <Modal 
                    title={'编辑商品'}
                    visible={visible}
                    onCancel={onClose}
                    style={{ top: 20 }}
                    onOk={this.onClickSave}
                    maskClosable={false}
                    destroyOnClose
                >
                    <Form layout="vertical">
                        {fileds.map(field => (
                            <Form.Item key={field.title} {...formItemLayout} label={field.title}>
                                {getFieldDecorator(field.dataIndex, {
                                    rules: [
                                        {
                                            required: true,
                                            message: `请输入${field.title}`
                                        }
                                    ],
                                    initialValue: originGood[field.dataIndex]
                                })(<Input />)}
                            </Form.Item>
                        ))}
                        <Form.Item {...formItemLayout} label="商品类别">
                            {getFieldDecorator('category', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择商品类别'
                                    }
                                ],
                                initialValue: originGood.category
                            })(
                                <Select placeholder="请选择商品类别">
                                    <Option value={'家用电器'}>家用电器</Option>
                                    <Option value={'食用酒水'}>食用酒水</Option>
                                    <Option value={'个护健康'}>个护健康</Option>
                                    <Option value={'服饰箱包'}>服饰箱包</Option>
                                    <Option value={'母婴产品'}>母婴产品</Option>
                                    <Option value={'其他'}>其他</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}

export default GoodModal