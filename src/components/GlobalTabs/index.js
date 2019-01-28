import React, { PureComponent } from 'react';
import styles from './index.css';
import { Tabs } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import classnames from 'classnames';

const { TabPane } = Tabs;

@connect(({ tabs, routing }) => ({
	panes: tabs.tabs,
	pathname: routing.location.pathname
}))
class GlobalTabs extends PureComponent {
	onEdit = (targetKey, action) => {
		if (action === 'remove') {
			this.props.dispatch({
				type: 'tabs/remove_tab',
				payload: targetKey
			});
		}
	};
	render() {
		const { panes, pathname } = this.props;
		return (
			<Tabs onEdit={this.onEdit} type="editable-card" activeKey={pathname} hideAdd>
				{panes.map(pane => (
					<TabPane
						key={pane.url}
						tab={
							<Link
								className={classnames(styles.link, {
									[styles.link_active]: pathname === pane.url
								})}
								to={pane.url}
							>
								{pane.title}
							</Link>
						}
						closable
					/>
				))}
			</Tabs>
		);
	}
}

export default GlobalTabs;
