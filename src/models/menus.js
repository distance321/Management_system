import { Icon } from 'antd';
const Items = [
	{
		key: 'dashboard',
		title: <span><Icon type="dashboard" /><span>Dashboard</span></span>,
		subItems: [
			{
				title: '销售分析',
				url: '/home'
			}
		]
	},
	{
		key: 'good',
		title: <span><Icon type="table" /><span>商品管理</span></span>,
		subItems: [
			{
				title: '商品列表',
				url: '/goods/goodList'
			},
			{
				title: '添加商品',
				url: '/goods/addGood'
			},
		]
	},
	{
		key: 'people',
		title: <span><Icon type="solution" /><span>员工管理</span></span>,
		subItems: [
			{
				title: '员工列表',
				url: '/people/peopleList'
			},
			{
				title: '添加员工',
				url: '/people/addPeople'
			},
		]
	},
	{
		key: 'user',
		title: <span><Icon type="user" /><span>用户配置</span></span>,
		subItems: [
			{
				title: '用户',
				url: '/user'
			}
		]
	},
];
const menu_items = Items.reduce((init, item) => [...init, ...item.subItems], []);
const menu_urls = menu_items.reduce((obj, x) => ({ ...obj, ...{ [x.url]: x } }), {});

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
