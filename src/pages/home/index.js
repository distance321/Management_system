import React, { PureComponent } from 'react';
import { Bar, Pie, ChartCard, yuan, Field, MiniBar, MiniProgress } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import { Row, Col, Icon, Tooltip } from 'antd';
import PageLoading from '@/components/PageLoading';
import numeral from 'numeral';

import { connect } from 'dva';
@connect(({ home, loading }) => ({
    data: home.results,
    loading: loading.effects['home/fetch'],
}))
class Home extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'home/fetch'
        })
    }

    render() {
        const { data, loading } = this.props
        if (loading) {
            return <PageLoading />
        }
        return (
            <>
                <Row>
                    <Col span={6}>
                        <ChartCard
                            title="周销售额"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={() => (
                                <span dangerouslySetInnerHTML={{ __html: yuan(data.weeklySales) }} />
                            )}
                            footer={
                                <Field label="日均销售额" value={numeral(data.weeklySales / 7).format("0,0")} />
                            }
                            contentHeight={46}
                        >
                            <Row>
                                <span>
                                    周同比
                                    <Trend flag={data.salesWeekComparedType} style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>
                                        {data.salesWeekCompared + '%'}
                                    </Trend>
                                </span>
                            </Row>
                            <Row>
                                <span >
                                    日环比
                                    <Trend
                                        flag={data.salesDayComparedType}
                                        style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}
                                    >
                                        {data.salesDayCompared + '%'}
                                    </Trend>
                                </span>
                            </Row>
                        </ChartCard>
                    </Col>
                    <Col span={6}>
                        <ChartCard
                            title="周订单数量"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o" />
                                </Tooltip>
                            }
                            total={() => (
                                <span dangerouslySetInnerHTML={{ __html: numeral(data.weeklyOrders).format("0,0") }} />
                            )}
                            footer={
                                <Field label="日均订单" value={numeral(data.weeklyOrders / 7).format("0,0")} />
                            }
                            contentHeight={46}
                        >
                            <Row>
                                <span>
                                    周同比
                                    <Trend flag={data.ordersWeekComparedType} style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>
                                        {data.ordersWeekCompared + '%'}
                                    </Trend>
                                </span>
                            </Row>
                            <Row>
                                <span >
                                    日环比
                                    <Trend
                                        flag={data.ordersDayComparedType}
                                        style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}
                                    >
                                        {data.ordersDayCompared + '%'}
                                    </Trend>
                                </span>
                            </Row>
                        </ChartCard>
                    </Col>
                    <Col span={6} >
                        <ChartCard
                            title="周新增会员"
                            action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                            total={numeral(data.newMembers).format('0,0')}
                            footer={<Field label="日均新增" value={numeral(data.newMembers / 7).format('0,0')} />}
                            contentHeight={46}
                        >
                            <MiniBar
                                height={46}
                                data={data.visitData}
                            />
                        </ChartCard>
                    </Col>
                    <Col span={6} >
                        <ChartCard
                            title="周销售额完成率"
                            action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                            total={data.completeDegree + '%'}
                            footer={
                                <Field label="日均完成度" value={numeral(data.completeDegree / 7).format("0,0.0")} />
                            }
                            contentHeight={46}
                        >
                            <MiniProgress percent={78} strokeWidth={8} target={80} />
                        </ChartCard>
                    </Col>
                </Row>
                <Row style={{ marginTop: 24 }}>
                    <ChartCard>
                        <Col span={16}>
                            <Bar
                                height={400}
                                title="销售额趋势"
                                data={data.salesData}
                            />
                        </Col>
                        <Col span={8}>
                            <Pie
                                hasLegends
                                title="销售额"
                                subTitle="销售额"
                                hasLegend={true}
                                total={() => (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: yuan(data.salesPieData ? data.salesPieData.reduce((pre, now) => now.y + pre, 0): 0)
                                        }}
                                    />
                                )}
                                data={data.salesPieData}
                                valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
                                height={150}
                            />
                        </Col>
                    </ChartCard>
                </Row>
            </>
        )
    }
}

export default Home