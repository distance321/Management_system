import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Card, Table, Input, Divider, Popconfirm } from 'antd';
import { yuan } from 'ant-design-pro/lib/Charts';
import router from 'umi/router';
import GoodModal from './components/GoodModal'
import _ from 'lodash'
const Search = Input.Search;
@connect(({ goodList, loading }) => ({
    results: goodList.results,
    count: goodList.count,
    pagination: goodList.pagination,
    loading: loading.effects['goodList/fetch'],
}))
class GoodList extends PureComponent {
    state = {
        modelVisible: false,
        originGood: {},
        Id: null
    }

    componentDidMount() {
        this.fetchGoodList()
    }

    fetchGoodList = params => {
        const { dispatch } = this.props;
        dispatch({
            type: 'goodList/fetch',
            payload: params
        });
    }

    onPageChange = ({ pageSize, current }) => {
        let param = {
            search: this.state.searchVal,
            page_size: pageSize,
            page: current,
        }
        this.fetchGoodList(param)
        const { dispatch } = this.props
        dispatch({
            type: 'goodList/changePage',
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
        this.fetchGoodList(param)
        const { dispatch } = this.props
		dispatch({
			type: 'goodList/changePage',
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
			type: 'goodList/update',
			payload: values
		});
	};

    editRow = (record) => {
        this.setState({
			modelVisible: true,
            originGood: record,
            Id: record.Id
		});
    };

	removeRow = Id => {
		const { dispatch } = this.props;
		dispatch({
			type: 'goodList/delete',
			payload: Id
		});
    };
    
    addGood = () => {
        router.push('/goods/addGood')
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
                title: '商品编号',
                dataIndex: 'serialNumber',
                width: 100,
                align: 'center',
                key: 'serialNumber'
            },
            {
                title: '商品名称',
                dataIndex: 'name',
                width: 100,
                align: 'center',
                key: 'name'
            },
            {
                title: '商品总量',
                dataIndex: 'total',
                width: 100,
                align: 'center',
                key: 'total'
            },
            {
                title: '销售量',
                dataIndex: 'sales',
                width: 100,
                align: 'center',
                key: 'sales'
            },
            {
                title: '商品类别',
                dataIndex: 'category',
                width: 100,
                align: 'center',
                key: 'category'
            },
            {
                title: '商品价格',
                dataIndex: 'price',
                width: 100,
                align: 'center',
                key: 'price'
            },
            {
                title: '商品销售额',
                dataIndex: 'goodSales',
                width: 120,
                align: 'center',
                key: 'goodSales',
                render : (text,record) => {
                    return (
                        <>{yuan(record.price * record.sales)}</>
                    )
                }
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
								<Popconfirm title="是否要删除此商品？" onConfirm={() => this.removeRow(record.Id)}>
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
                <GoodModal
                    visible={this.state.modelVisible}
					onClose={this.onCloseModal}
					onEdit={this.onEdit}
					handlevisible={this.handlevisible}
					originGood={this.state.originGood}
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
                        <Col span={2}>
                            <Button onClick={this.addGood} type="primary" icon="plus" >添加商品</Button>
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
export default GoodList