import { Icon } from 'antd';
const Items = [
	{
		key : 1,
		title: <span><Icon type="bar-chart" /><span>销售分析</span></span>,
		url: '/home'
	},
	{
		key : 2,
		title: <span><Icon type="money-collect" /><span>薪资管理</span></span>,
		url: '/salary'
	},
	{
		key : 3,
		title: <span><Icon type="table" /><span>商品列表</span></span>,
		url: '/goods/goodList',
	},
	{
		key : 4,
		title: <span><Icon type="plus-square" /><span>添加商品</span></span>,
		url: '/goods/addGood'
	},
	{
		key : 5,
		title: <span><Icon type="team" /><span>会员列表</span></span>,
		url: '/members/memberList'
	},
	{
		key : 6,
		title: <span><Icon type="usergroup-add" /><span>添加会员</span></span>,
		url: '/members/addMember'
	},
	{
		key : 7,
		title: <span><Icon type="solution" /><span>员工列表</span></span>,
		url: '/people/peopleList'
	},
	{
		key : 8,
		title: <span><Icon type="user-add" /><span>添加员工</span></span>,
		url: '/people/addPeople'
	},
	{
		key : 9,
		title: <span><Icon type="user" /><span>用户管理</span></span>,
		url: '/user'
	},
];

let permissions = []
sessionStorage.getItem('per') ?  permissions = sessionStorage.getItem('per').split(',') : permissions =[]


let list = []
if(permissions.length){
  permissions.forEach(item => {
    Items.forEach(element => {
      if(element.key === Number(item)){
        list.push(element)
      }
    })
  });
}


export default {
	namespace: 'menus',
	state: {
		collapsed: false,
		menuItems: Items
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname !== 'login' && list.length) {
          dispatch({ type: 'changeMenuItems', payload: list });
        }
      });
    },
  },
	reducers : {
		updateCollapsed(state, { payload }){
			state.collapsed = payload
		},
		updateMenus(state, { payload }){
			state.menuItems = payload
    },
    changeMenuItems(state, { payload }){
      state.menuItems = payload
    }
	},
	effects : {
		*changeCollapsed({ payload },{ put }){
			yield put({
				type: 'updateCollapsed',
				payload : payload
			})
		},
		*changeMenus({ payload },{ put }){
			let list = []
			payload.forEach(item => {
				Items.forEach(element => {
					if(element.key === Number(item)){
						list.push(element)
					}
				})
			});
			yield put({
				type: 'updateMenus',
				payload : list
			})
		}
	}
};
