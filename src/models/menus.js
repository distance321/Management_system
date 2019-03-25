import { Icon } from 'antd';
const Items = [
	{
		title: <span><Icon type="bar-chart" /><span>销售分析</span></span>,
		url: '/home'
	},
	{
		title: <span><Icon type="table" /><span>商品列表</span></span>,
		url: '/goods/goodList',
	},
	{
		title: <span><Icon type="plus-square" /><span>添加商品</span></span>,
		url: '/goods/addGood'
	},
	{
		title: <span><Icon type="solution" /><span>员工列表</span></span>,
		url: '/people/peopleList'
	},
	{
		title: <span><Icon type="user-add" /><span>添加员工</span></span>,
		url: '/people/addPeople'
	},
	{
		title: <span><Icon type="user" /><span>用户管理</span></span>,
		url: '/user'
	},
];
const menu_urls = Items.reduce((obj, x) => ({ ...obj, ...{ [x.url]: x } }), {});

export default {
	namespace: 'menus',
	state: {
		collapsed: false,
		menuItems: Items
	},
	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(({ pathname }) => {
				if (Object.keys(menu_urls).includes(pathname)) {
					dispatch({
						type: 'tabs/add',
						payload: menu_urls[pathname]
					});
				}
			});
		}
	},
	reducers : {
		updateCollapsed(state, { payload }){
			state.collapsed = payload
		},
	},
	effects : {
		*changeCollapsed({ payload },{ put }){
			yield put({
				type: 'updateCollapsed',
				payload : payload
			})
		},
	}
};
