import React, { PureComponent } from 'react';
import { Row,  Button, Card, Input, Form,  Select } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import moment from 'moment'
import { RegTel } from '@/constants/commonData';
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
@connect(({ addMember }) => ({ addMember }))
class AddMember extends PureComponent {

    onSave = (values) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'addMember/create',
            payload: values
        });
        this.props.form.resetFields()
    }

    onBack = () => {
        router.push('/members/memberList')
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
                <Row>
                    <Card title={'添加会员'}>
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
                            <Form.Item {...formItemLayout} label="联系方式">
                                {getFieldDecorator('tel', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入正确的联系方式',
                                            pattern: RegTel
                                        }
                                    ]
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
                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button style={{ marginRight: 10 }} onClick={this.onBack}>返回列表</Button>
                            <Button type="primary" onClick={this.onClickSave}>添加会员</Button>
                        </Row>
                    </Card>
                </Row>
            </>
        )
    }
}

export default AddMember