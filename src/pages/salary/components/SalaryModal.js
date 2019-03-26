import React, { PureComponent } from 'react';
import { Input, Modal, Form } from 'antd';
const formItemLayout = {
    labelCol: {
        xs: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 12 }
    }
};

@Form.create()
class SalaryModal extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            originSalary: {}
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.originSalary !== state.originSalary) {
            let originSalary = nextProps.originSalary
            return {
                originSalary: originSalary
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
        const { originSalary } = this.state
        const { getFieldDecorator } = form;
        let fileds = [
            {
                title: '工资合计',
                dataIndex: 'salary'
            },
            {
                title: '缺勤扣款',
                dataIndex: 'absenteeism'
            },
            {
                title: '各项补贴',
                dataIndex: 'subsidies'
            },
        ]
        return (
            <>
                <Modal
                    title={'编辑薪资信息'}
                    visible={visible}
                    onCancel={onClose}
                    style={{ top: 20 }}
                    onOk={this.onClickSave}
                    maskClosable={false}
                    destroyOnClose
                >
                    <Form layout="horizontal">
                        <Form.Item {...formItemLayout} label="姓名">
                            {getFieldDecorator('name', {
                                initialValue: originSalary.name
                            })(<Input readOnly={true} style={{ backgroundColor: '#d9d9d9' }}/>)}
                        </Form.Item>
                        {fileds.map(field => (
                            <Form.Item key={field.title} {...formItemLayout} label={field.title}>
                                {getFieldDecorator(field.dataIndex, {
                                    rules: [
                                        {
                                            required: true,
                                            message: `请输入${field.title}`
                                        }
                                    ],
                                    initialValue: originSalary[field.dataIndex]
                                })(<Input />)}
                            </Form.Item>
                        ))}
                    </Form>
                </Modal>
            </>
        )
    }
}

export default SalaryModal