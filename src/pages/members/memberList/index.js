import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Card, Table, Input, Divider, Popconfirm } from 'antd';
import router from 'umi/router';
import download from '@/utils/download'
import MemberModal from './components/MemberModal'
import _ from 'lodash'
const Search = Input.Search;
@connect(({ memberList, loading }) => ({
    results: memberList.results,
    allMember: memberList.allMember,
    count: memberList.count,
    pagination: memberList.pagination,
    loading: loading.effects['memberList/fetch'],
}))
class MemberList extends PureComponent {
    state = {
        modelVisible: false,
        originMember: {},
        Id: null
    }

    componentDidMount() {
        this.fetchMemberList()
    }

    fetchMemberList = params => {
        const { dispatch } = this.props;
        dispatch({
            type: 'memberList/fetch',
            payload: params
        });
    }

    onPageChange = ({ pageSize, current }) => {
        let param = {
            search: this.state.searchVal,
            page_size: pageSize,
            page: current,
        }
        this.fetchMemberList(param)
        const { dispatch } = this.props
        dispatch({
            type: 'memberList/changePage',
            payload: current
        })
    }

    onSearch = () => {
        let param = {
            search: this.state.searchVal,
            page_size: 10,
			page: 1
		}
		for(var key in param){    
            if(!param[key]){
                delete param[key]
            }     
        }
        this.fetchMemberList(param)
        const { dispatch } = this.props
		dispatch({
			type: 'memberList/changePage',
			payload: 1
		})
    }

    onSearchValueChange = event => this.setState({ searchVal: event.target.value })

    onCloseModal = () => {
		this.setState({
			modelVisible: false
		});
    };
    
    handlevisible = () =>{
		this.setState({
			modelVisible: false
		});
    }
    
    onEdit = values => {
        const { dispatch } = this.props;
        values.Id = this.state.Id
		dispatch({
			type: 'memberList/update',
			payload: values
		});
	};

    editRow = (record) => {
        this.setState({
			modelVisible: true,
            originMember: record,
            Id: record.Id
		});
    };

	removeRow = Id => {
		const { dispatch } = this.props;
		dispatch({
			type: 'memberList/delete',
			payload: Id
		});
    };
    
    addMember = () => {
        router.push('/members/addMember')
    }

    getAllMember = () => {
        const { dispatch } = this.props;
		dispatch({
			type: 'memberList/fetchAllMember'
        });
        const { allMember } = this.props
        if(allMember.length){
            this.downloadExl()
        }
    }
    downloadExl = () => {
		const { allMember } = this.props
		let json = allMember.map(item=> {
			return {
				'会员卡号' :item.cardNumber,
				'姓名' : item.name,
                '联系方式': item.tel,
                '会员类别': item.category,
			}
        })
		download(json,'会员信息.xlsx')
    }
    render() {
        const { results, loading, count, pagination } = this.props
        const columns = [
            {
                title: '',
                dataIndex: 'index',
                align: 'center',
                width: 10,
                render: (text, record, index) => index + 1
            },
            {
                title: '会员卡号',
                dataIndex: 'cardNumber',
                width: 100,
                align: 'center',
                key: 'cardNumber'
            },
            {
                title: '姓名',
                dataIndex: 'name',
                width: 100,
                align: 'center',
                key: 'name'
            },
            {
                title: '联系方式',
                dataIndex: 'tel',
                width: 100,
                align: 'center',
                key: 'tel'
            },
            {
                title: '会员级别',
                dataIndex: 'category',
                width: 100,
                align: 'center',
                key: 'category'
            },
            {
				title: '操作',
				width: 120,
				align: 'center',
				render: (text,record) => {
					return (
						<span>
							<Row>
								<a onClick={() => this.editRow(record)}>编辑</a>
								<Divider type="vertical" />
								<Popconfirm title="是否要删除此会员？" onConfirm={() => this.removeRow(record.Id)}>
									<a>删除</a>
								</Popconfirm>
							</Row>
						</span>
					);
				}
			}
        ]
        return (
            <>
                <MemberModal
                    visible={this.state.modelVisible}
					onClose={this.onCloseModal}
					onEdit={this.onEdit}
					handlevisible={this.handlevisible}
					originMember={this.state.originMember}
                />
                <Row>
                    <Card title='控制台'>
                        <Col span={6}>
                            <Search
                                placeholder="请输入搜索信息"
                                onSearch={this.onSearch}
                                onChange={this.onSearchValueChange}
                                style={{ width: 200 }}
                            />
                        </Col>
                        <Col span={8}>
                            <Button onClick={this.addMember} type="primary" icon="plus" style={{marginRight:10}}>添加会员</Button>
                            {/* <Button onClick={this.getAllMember} type="primary" icon="download">下载员工信息</Button> */}
                        </Col>
                    </Card>
                </Row>
                <Row>
                    <Card bordered={false}>
                        <Table
                            title={() => `共${count}条记录`}
                            bordered
                            rowKey={(r,i) => i}
                            columns={columns}
                            dataSource={results}
                            onChange={this.onPageChange}
                            pagination={{
                                hideOnSinglePage: true,
                                showQuickJumper: true,
                                pageSize: pagination.page_size,
                                total: count,
                                current: pagination.page
                            }}
                            loading={loading}
                            size="small"
                        />
                    </Card>
                </Row>
            </>
        )
    }
}
export default MemberList