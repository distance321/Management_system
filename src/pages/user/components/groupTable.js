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
		const { onEditGroup,back } = this.props;
        onEditGroup(this.state.selectedRowKeys)
        back()
	};

	render() {
		const { back,user_permissions } = this.props;
        const { selectedRowKeys, disabled} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
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
                            dataSource={user_permissions}
                            rowSelection={rowSelection}
							size="small"
						/>
                        <Row style={{display:'flex',justifyContent: 'center'}}>
                            <Button style={{marginRight:10}} onClick={this.onClickEdit} disabled={disabled} type='primary'>保存</Button>
                            <Button onClick={() => back()}>返回</Button>
                        </Row>
					</Card>
				</Row>
            </>
        )
	}
}

export default GroupTable;
