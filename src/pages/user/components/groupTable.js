import React, { PureComponent } from 'react';
import { Row, Button, Card, Table } from 'antd';
import { connect } from 'dva';
@connect(({ users }) => ({
    user_permissions : users.permissions
}))
class GroupTable extends PureComponent {
	state = {
        selectedRowKeys: [],
        permissions: [],
        disabled: false
    };
    
    componentDidMount () {
        const { dispatch } = this.props
        dispatch({
            type: 'users/fetchPermissions'
		});
    }

	//获取新的数据和组件状态
	static getDerivedStateFromProps(nextProps,state){
		if(nextProps.permissions !== state.permissions){
            return {
                permissions : nextProps.permissions,
                selectedRowKeys : nextProps.permissions
            }
        }
        return null
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ 
            selectedRowKeys: selectedRowKeys 
        })
    }
	//确认修改方法
	onClickEdit = () => {
		const { onEditGroup } = this.props;
        onEditGroup(this.state.selectedRowKeys)
        this.setState({
            disabled : true
        })
	};

	render() {
		const { back,user_permissions } = this.props;
        const { selectedRowKeys, disabled} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        let dataList = []
        user_permissions.forEach(item => {
            switch (item.name) {
                case 'basic_info_management': dataList.push({ id: item.id , dataName : '基础数据管理' }) 
                    break;
                case 'information_security_management': dataList.push({ id: item.id , dataName : '信息安全管理' })
                    break;
                case 'log_management': dataList.push({ id: item.id , dataName : '日志管理' })   
                    break;
                case 'system_management': dataList.push({ id: item.id , dataName : '系统配置' })
                    break;
                case 'code_table_management': dataList.push({ id: item.id , dataName : '代码表管理' })
                    break;
                case 'data_management': dataList.push({ id: item.id , dataName : '数据安全管理' }) 
                    break;
                case 'user_management': dataList.push({ id: item.id , dataName : '用户管理' })
                    break;
                case 'system_monitor': dataList.push({ id: item.id , dataName : '系统监控' })             
                    break;
                default:
                    break;
            }
        })
        const columns = [
            {
				title: '可操作内容',
				dataIndex: 'dataName',
				width: 100,
				align: 'center',
				key: 'dataName'
			},
        ]
        return (
            <>
                <Row>
					<Card bordered={false}>
						<Table
							title={() => `权限管理`  }
							bordered
							rowKey={record => record.id}
							columns={columns}
                            dataSource={dataList}
                            rowSelection={rowSelection}
							size="small"
						/>
                        <Row style={{display:'flex',justifyContent: 'center'}}>
                            <Button style={{marginRight:10}} onClick={this.onClickEdit} disabled={disabled}>保存</Button>
                            <Button onClick={() => back()}>返回</Button>
                        </Row>
					</Card>
				</Row>
            </>
        )
	}
}

export default GroupTable;
