import React, { PureComponent } from 'react';
import styles from './index.css';
import { Layout, Icon } from 'antd';
import RightContent from './RightContent';
import { connect } from 'dva';
@connect(({ menus }) => ({
	collapsed: menus.collapsed
}))
class GlobalHeader extends PureComponent {
	state = {
		collapsed: false,
	};
	toggle = () => {
		const { dispatch } = this.props
		dispatch({
			type: 'menus/changeCollapsed',
			payload : !this.state.collapsed
		})
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}
	render() {
		const { Header } = Layout;
		return (
			<Header className={styles.header}>
				<Icon
					className={styles.trigger}
					type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
					onClick={this.toggle}
					style={{fontSize:24}}
				/>
				<RightContent />
			</Header>
		);
	}
}

export default GlobalHeader;
