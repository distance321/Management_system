import { Layout } from 'antd';
import styles from './index.css'
import GlobalHeader from '@/components/GlobalHeader';
import GlobalTabs from '@/components/GlobalTabs';
import SiderMenu from '@/components/SiderMenu'
import { PureComponent } from 'react';
const { Content } = Layout;
class SiderDemo extends PureComponent {
  render() {
    const {
			children,
		} = this.props;
    return (
      <Layout className={styles.container}>
        <Layout>
          <SiderMenu/>
          <Content >
          <GlobalHeader/>
          <GlobalTabs/>
            <div className={styles.page_content}>{children}</div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo