import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Card, Table, Input, Divider, Popconfirm } from 'antd';
import router from 'umi/router';
import download from '@/utils/download'
import PeopleModal from './components/PeopleModal'
import _ from 'lodash'
const Search = Input.Search;
@connect(({ peopleList, loading }) => ({
    results: peopleList.results,
    allPeople: peopleList.allPeople,
    count: peopleList.count,
    pagination: peopleList.pagination,
    loading: loading.effects['peopleList/fetch'],
}))
class PeopleList extends PureComponent {
    state = {
        modelVisible: false,
        originPeople: {},
        Id: null
    }

    componentDidMount() {
        this.fetchPeopleList()
    }

    fetchPeopleList = params => {
        const { dispatch } = this.props;
        dispatch({
            type: 'peopleList/fetch',
            payload: params
        });
    }

    onPageChange = ({ pageSize, current }) => {
        let param = {
            search: this.state.searchVal,
            page_size: pageSize,
            page: current,
        }
        this.fetchPeopleList(param)
        const { dispatch } = this.props
        dispatch({
            type: 'peopleList/changePage',
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
        this.fetchPeopleList(param)
        const { dispatch } = this.props
		dispatch({
			type: 'peopleList/changePage',
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
			type: 'peopleList/update',
			payload: values
		});
	};

    editRow = (record) => {
        this.setState({
			modelVisible: true,
            originPeople: record,
            Id: record.Id
		});
    };

	removeRow = Id => {
		const { dispatch } = this.props;
		dispatch({
			type: 'peopleList/delete',
			payload: Id
		});
    };
    
    addPeople = () => {
        router.push('/people/addPeople')
    }

    getAllPeople = () => {
        const { dispatch } = this.props;
		dispatch({
			type: 'peopleList/fetchAllPeople'
        });
        const { allPeople } = this.props
        if(allPeople.length){
            this.downloadExl()
        }
    }
    downloadExl = () => {
		const { allPeople } = this.props
		let json = allPeople.map(item=> {
			return {
				'工号' :item.workNumber,
				'姓名' : item.name,
				'出生日期': item.birthDate,
				'籍贯': item.county,
                '联系方式': item.tel,
                '入职日期': item.entryDate,
                '员工类别': item.category,
			}
        })
		download(json,'员工信息.xlsx')
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
                title: '工号',
                dataIndex: 'workNumber',
                width: 100,
                align: 'center',
                key: 'workNumber'
            },
            {
                title: '姓名',
                dataIndex: 'name',
                width: 100,
                align: 'center',
                key: 'name'
            },
            {
                title: '出生日期',
                dataIndex: 'birthDate',
                width: 100,
                align: 'center',
                key: 'birthDate'
            },
            {
                title: '籍贯',
                dataIndex: 'county',
                width: 150,
                align: 'center',
                key: 'county'
            },
            {
                title: '联系方式',
                dataIndex: 'tel',
                width: 100,
                align: 'center',
                key: 'tel'
            },
            {
                title: '入职日期',
                dataIndex: 'entryDate',
                width: 100,
                align: 'center',
                key: 'entryDate'
            },
            {
                title: '员工类别',
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
								<Popconfirm title="是否要删除此员工？" onConfirm={() => this.removeRow(record.Id)}>
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
                <PeopleModal
                    visible={this.state.modelVisible}
					onClose={this.onCloseModal}
					onEdit={this.onEdit}
					handlevisible={this.handlevisible}
					originPeople={this.state.originPeople}
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
                            <Button onClick={this.addPeople} type="primary" icon="plus" style={{marginRight:10}}>添加员工</Button>
                            <Button onClick={this.getAllPeople} type="primary" icon="download">下载员工信息</Button>
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
export default PeopleList