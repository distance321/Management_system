import React, { PureComponent } from 'react';
import styles from './index.css';
import { Layout } from 'antd';
import RightContent from './RightContent';
class GlobalHeader extends PureComponent {

	render() {
		const { Header } = Layout;
		return (
			<Header className={styles.header}>
				<RightContent />
			</Header>
		);
	}
}

export default GlobalHeader;
