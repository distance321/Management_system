import React, { PureComponent } from 'react';
import { Row, Col, Button, Card, Input, Form, DatePicker, Select } from 'antd';
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
@connect(({ addPeople }) => ({ addPeople }))
class AddPeople extends PureComponent {

    onSave = (values) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'addPeople/create',
            payload: values
        });
        this.props.form.resetFields()
    }

    onBack = () => {
        router.push('/people/peopleList')
    }

    //确认添加方法
    onClickSave = () => {
        const {
            form: { validateFieldsAndScroll }
        } = this.props;
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.birthDate = moment(values.birthDate).format("YYYY-MM-DD")
                values.entryDate = moment(values.entryDate).format("YYYY-MM-DD")
                this.onSave(values)
            }
        })
    }

    render() {
        const { form } = this.props;
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
                <Row>
                    <Card title={'添加人员'}>
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
                            <Form.Item {...formItemLayout} label="出生日期">
                                {getFieldDecorator('birthDate', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择出生日期'
                                        }
                                    ]
                                })(
                                    <DatePicker
                                        style={{ width: '100%' }}
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
                                            message: '请选择员工类别'
                                        }
                                    ]
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
                                    ]
                                })(
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        placeholder="请选择入职日期"
                                        format="YYYY-MM-DD"
                                    />
                                )}
                            </Form.Item>
                        </Form>
                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button style={{ marginRight: 10 }} onClick={this.onBack}>返回列表</Button>
                            <Button type="primary" onClick={this.onClickSave}>添加人员</Button>
                        </Row>
                    </Card>
                </Row>
            </>
        )
    }
}

export default AddPeople