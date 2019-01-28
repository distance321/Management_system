import { Icon } from 'antd';
const Items = [
	{
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
		menuItems: Items
	},
	// subscriptions: {
	// 	setup({ dispatch, history }) {
	// 		history.listen(({ pathname }) => {
	// 			if (Object.keys(menu_urls).includes(pathname)) {
	// 				dispatch({
	// 					type: 'tabs/add',
	// 					payload: menu_urls[pathname]
	// 				});
	// 			}
	// 		});
	// 	}
	// }
};
