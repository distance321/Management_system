import React, { PureComponent } from 'react';
import { Row, Button, Card, Input, Form, Select } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        xs: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 8 }
    }
};


@Form.create()
@connect(({ addGood }) => ({ addGood }))
class AddGood extends PureComponent {

    onSave = (values) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'addGood/create',
            payload: values
        });
        this.props.form.resetFields()
    }

    onBack = () => {
        router.push('/goods/goodList')
    }

    //确认添加方法
    onClickSave = () => {
        const {
            form: { validateFieldsAndScroll }
        } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.onSave(values)
            }
        })
    }

    render() {
        const { form } = this.props;
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
                <Row>
                    <Card title={'添加商品'}>
                        <Form layout="horizontal">
                            {fileds.map(field => (
                                <Form.Item key={field.title} {...formItemLayout} label={field.title}>
                                    {getFieldDecorator(field.dataIndex, {
                                        rules: [
                                            {
                                                required: true,
                                                message: `请输入${field.title}`
                                            }
                                        ]
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
                                    ]
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
                        <Row style={{display:'flex',justifyContent:'center'}}>
                            <Button style={{marginRight:10}} onClick={this.onBack}>返回列表</Button>
                            <Button type="primary" onClick={this.onClickSave}>添加商品</Button>
                        </Row>
                    </Card>
                </Row>
            </>
        )
    }
}

export default AddGood