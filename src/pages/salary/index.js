import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Card, Table, Input } from 'antd';
import download from '@/utils/download'
import router from 'umi/router';
import SalaryModal from './components/SalaryModal'
import _ from 'lodash'
const Search = Input.Search;
@connect(({ salaryList, loading }) => ({
  results: salaryList.results,
  count: salaryList.count,
  allSalary: salaryList.allSalary,
  pagination: salaryList.pagination,
  loading: loading.effects['salaryList/fetch'],
}))
class SalaryList extends PureComponent {
  state = {
    modelVisible: false,
    originSalary: {},
    results: null,
    dataList: null,
    Id: null
  }

  componentDidMount() {
    this.fetchSalaryList()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { results } = nextProps
    if (results.length && results !== prevState.results) {
      let dataList = []
      results.forEach(item => {
        dataList.push(
          {
            Id: item.Id,
            name: item.name,
            salary: _.floor(item.salary, 2),
            absenteeism: item.absenteeism,
            subsidies: item.subsidies,
            endowmentInsurance: _.floor(item.salary * 0.08, 2),
            unemploymentInsurance: _.floor(item.salary * 0.002, 2),
            medicalInsurance: _.floor(item.salary * 0.02, 2),
            housingFund: _.floor(item.salary * 0.12, 2),
          }
        )
      });
      return {
        dataList: dataList,
        results: results
      }
    }
    return null
  }


  fetchSalaryList = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'salaryList/fetch',
      payload: params
    });
  }

  onPageChange = ({ pageSize, current }) => {
    let param = {
      search: this.state.searchVal,
      page_size: pageSize,
      page: current,
    }
    this.fetchSalaryList(param)
    const { dispatch } = this.props
    dispatch({
      type: 'salaryList/changePage',
      payload: current
    })
  }

  onSearch = () => {
    let param = {
      search: this.state.searchVal,
      page_size: 10,
      page: 1
    }
    for (var key in param) {
      if (!param[key]) {
        delete param[key]
      }
    }
    this.fetchSalaryList(param)
    const { dispatch } = this.props
    dispatch({
      type: 'salaryList/changePage',
      payload: 1
    })
  }

  onSearchValueChange = event => this.setState({ searchVal: event.target.value })

  onCloseModal = () => {
    this.setState({
      modelVisible: false
    });
  };

  handlevisible = () => {
    this.setState({
      modelVisible: false
    });
  }

  onEdit = values => {
    const { dispatch } = this.props;
    values.Id = this.state.Id
    dispatch({
      type: 'salaryList/update',
      payload: values
    });
  };

  editRow = (record) => {
    this.setState({
      modelVisible: true,
      originSalary: record,
      Id: record.Id
    });
  };

  removeRow = Id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'salaryList/delete',
      payload: Id
    });
  };

  getAllSalary = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'salaryList/fetchAllSalary'
    });
    setTimeout(() => {
      const { allSalary } = this.props
      if (allSalary.length) {
        this.downloadExl()
      }
    }, 500);

  }
  downloadExl = () => {
    const { allSalary } = this.props
    let dataList = []
    if (allSalary.length) {
      allSalary.forEach(item => {
        dataList.push(
          {
            name: item.name,
            salary: _.floor(item.salary, 2),
            absenteeism: item.absenteeism,
            subsidies: item.subsidies,
            endowmentInsurance: _.floor(item.salary * 0.08, 2),
            unemploymentInsurance: _.floor(item.salary * 0.002, 2),
            medicalInsurance: _.floor(item.salary * 0.02, 2),
            housingFund: _.floor(item.salary * 0.12, 2),
          }
        )
      })
      let data = this.salaryCalculation(dataList)
      let json = data.map(item => {
        return {
          '姓名': item.name,
          '工资合计': item.salary,
          '缺勤扣款': item.absenteeism,
          '各项补贴': item.subsidies,
          '应发工资总额': item.shouldPay,
          '个人养老保险扣款': item.endowmentInsurance,
          '个人失业保险扣款': item.unemploymentInsurance,
          '个人医疗保险扣款': item.medicalInsurance,
          '个人住房公积金扣款': item.housingFund,
          '个税扣款': item.incomeTax,
          '实际发放': item.actualSalary,

        }
      })
      download(json, '本月薪资信息.xlsx')
    }

  }

  salaryCalculation = (arr) => {
    let dataList = _.cloneDeep(arr)
    dataList.forEach(item => {
      item.shouldPay = item.salary - item.absenteeism + item.subsidies
      let wage = item.salary - item.endowmentInsurance - item.unemploymentInsurance - item.medicalInsurance - item.housingFund
      if ((wage - 5000) <= 3000) {
        item.incomeTax = _.floor(0, 2)
        item.actualSalary = _.floor(wage - item.absenteeism + item.subsidies, 2)
      } else if ((wage - 5000) <= 12000) {
        item.incomeTax = _.floor(((wage - 5000) * 0.1) - 210, 2)
        item.actualSalary = _.floor(wage - (((wage - 5000) * 0.1) - 210) - item.absenteeism + item.subsidies, 2)
      } else if ((wage - 5000) <= 25000) {
        item.incomeTax = _.floor((wage - 5000) * 0.2 - 1410, 2)
        item.actualSalary = _.floor(wage - ((wage - 5000) * 0.2 - 1410) - item.absenteeism + item.subsidies, 2)
      } else if ((wage - 5000) <= 35000) {
        item.incomeTax = _.floor(((wage - 5000) * 0.25) - 2660, 2)
        item.actualSalary = _.floor(wage - (((wage - 5000) * 0.25) - 2660) - item.absenteeism + item.subsidies, 2)
      } else if ((wage - 5000) <= 55000) {
        item.incomeTax = _.floor(((wage - 5000) * 0.3) - 4410, 2)
        item.actualSalary = _.floor(wage - (((wage - 5000) * 0.3) - 4410) - item.absenteeism + item.subsidies, 2)
      } else if ((wage - 5000) <= 80000) {
        item.incomeTax = _.floor(((wage - 5000) * 0.35) - 7160, 2)
        item.actualSalary = _.floor(wage - (((wage - 5000) * 0.35) - 7160) - item.absenteeism + item.subsidies, 2)
      } else {
        item.incomeTax = _.floor(((wage - 5000) * 0.45 - 15160), 2)
        item.actualSalary = _.floor(wage - (((wage - 5000) * 0.45) - 15160) - item.absenteeism + item.subsidies, 2)
      }
    });
    return dataList
  }

  render() {
    const { loading, count, pagination } = this.props
    const { dataList } = this.state
    let data = []
    if (dataList) {
      data = this.salaryCalculation(dataList)
    }
    const columns = [
      {
        title: '',
        dataIndex: 'index',
        align: 'center',
        width: 10,
        render: (text, record, index) => index + 1
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 100,
        align: 'center',
        key: 'name'
      },
      {
        title: '工资合计',
        dataIndex: 'salary',
        width: 100,
        align: 'center',
        key: 'salary'
      },
      {
        title: '缺勤扣款',
        dataIndex: 'absenteeism',
        width: 100,
        align: 'center',
        key: 'absenteeism'
      },
      {
        title: '各项补贴',
        dataIndex: 'subsidies',
        width: 100,
        align: 'center',
        key: 'subsidies'
      },
      {
        title: '应发工资总额',
        dataIndex: 'shouldPay',
        width: 100,
        align: 'center',
        key: 'shouldPay'
      },
      {
        title: '个人养老保险扣款',
        dataIndex: 'endowmentInsurance',
        width: 100,
        align: 'center',
        key: 'endowmentInsurance'
      },
      {
        title: '个人失业保险扣款',
        dataIndex: 'unemploymentInsurance',
        width: 100,
        align: 'center',
        key: 'unemploymentInsurance'
      },
      {
        title: '个人医疗保险扣款',
        dataIndex: 'medicalInsurance',
        width: 100,
        align: 'center',
        key: 'medicalInsurance'
      },
      {
        title: '个人住房公积金扣款',
        dataIndex: 'housingFund',
        width: 100,
        align: 'center',
        key: 'housingFund'
      },
      {
        title: '个税扣款',
        dataIndex: 'incomeTax',
        width: 100,
        align: 'center',
        key: 'incomeTax'
      },
      {
        title: '实际发放',
        dataIndex: 'actualSalary',
        width: 100,
        align: 'center',
        key: 'actualSalary'
      },
      {
        title: '操作',
        width: 100,
        align: 'center',
        render: (text, record) => {
          return (
            <span>
              <Row>
                <a onClick={() => this.editRow(record)}>编辑</a>
              </Row>
            </span>
          );
        }
      }
    ]
    return (
      <>
        <SalaryModal
          visible={this.state.modelVisible}
          onClose={this.onCloseModal}
          onEdit={this.onEdit}
          handlevisible={this.handlevisible}
          originSalary={this.state.originSalary}
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
            <Col span={4}>
              <Button onClick={this.getAllSalary} type="primary" icon="download">下载本月薪资信息</Button>
            </Col>
          </Card>
        </Row>
        <Row>
          <Card bordered={false}>
            <Table
              title={() => `共${count}条记录`}
              bordered
              rowKey={(r, i) => i}
              columns={columns}
              dataSource={data}
              onChange={this.onPageChange}
              scroll={{ x: 1100 }}
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
export default SalaryList