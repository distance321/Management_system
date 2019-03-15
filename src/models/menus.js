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
