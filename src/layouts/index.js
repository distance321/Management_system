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
            <LocaleProvider locale={zh_CN}><div className={styles.page_content}>{children}<GlobalFooter links={links} copyright={copyright} /></div></LocaleProvider> 
            </Content>
          </Layout>
        </Layout>
      </TokenAuth>
    );
  }
}

export default SiderDemo