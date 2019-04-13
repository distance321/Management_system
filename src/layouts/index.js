import { Layout } from 'antd';
import styles from './index.css'
import { connect } from 'dva';
import GlobalHeader from '@/components/GlobalHeader';
import SiderMenu from '@/components/SiderMenu'
import Redirect from 'umi/redirect';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { PureComponent } from 'react';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import { LocaleProvider } from 'antd';
import { Exception } from 'ant-design-pro';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Icon } from 'antd';
const TokenAuth = RenderAuthorized('login');
const { Content } = Layout;
moment.locale('zh-cn');

const links = [{
  key: '帮助',
  title: '帮助',
  href: '',
}, {
  key: 'github',
  title: <Icon type="github" />,
  href: 'https://github.com/distance321/Management_system',
  blankTarget: true,
}, {
  key: '条款',
  title: '条款',
  href: '',
  blankTarget: true,
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2019 梦里南柯出品</div>;

@connect(({ login, loading, menus}) => ({
	login,
	menus,
	status: login.status,
	sameData: menus.sameData,
	user_permissions: login.user_permissions,
	permissions : login.permissions,
	userId : login.userId,
	submitting: loading.effects['login/login']
}))
class SiderDemo extends PureComponent {
  state = {
		can : null,
		permissions : null,
		first: true,
		status:false
  }
  
  hasToken = () => !! sessionStorage.getItem('token')
  

  judgeAuthority = ( pathname ) => {
    let permissions = sessionStorage.getItem('per').split(',')
    if(permissions.length > 0){
      switch (pathname) {
        case '/home': return (permissions.indexOf('1') > -1)
        case '/salary' : return (permissions.indexOf('2') > -1)
        case '/goods/goodList': return (permissions.indexOf('3') > -1)
        case '/goods/addGood' : return (permissions.indexOf('4') > -1)
        case '/members/memberList': return (permissions.indexOf('5') > -1)
        case '/members/addMember' : return (permissions.indexOf('6') > -1)
        case '/people/peopleList': return (permissions.indexOf('7') > -1)
        case '/people/addPeople' : return (permissions.indexOf('8') > -1)
        case '/user' : return (permissions.indexOf('8') > -1)        
        default: return false
      }
    }
  }

  render() {
    const {
			location: { pathname },
			children,
    } = this.props;
    if (['/login', '/Login'].includes(pathname)) {
			return <Layout className={styles.container}>{children}</Layout>;
		}
    return (
      <TokenAuth authority={this.hasToken} noMatch={<Redirect to="/Login" />}>
        <Layout className={styles.container}>
          <Layout>
            <SiderMenu/>
            <Content >
            <GlobalHeader/>
            {this.judgeAuthority(pathname) ? <LocaleProvider locale={zh_CN}><div className={styles.page_content}>{children}<GlobalFooter links={links} copyright={copyright} /></div></LocaleProvider>
							: <Exception type={403} 
								title={'访问受限'} 
								desc={'抱歉，你没有权限访问此页面，请联系管理员'} 
								backText={'更换账号'}
								redirect={'/Login'}
							/> }
            </Content>
          </Layout>
        </Layout>
      </TokenAuth>
    );
  }
}

export default SiderDemo